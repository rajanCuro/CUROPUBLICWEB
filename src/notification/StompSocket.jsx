// src/context/StompProvider.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from '../Authorization/AuthContext';

// ========== CONFIG ==========
const WS_CONFIG = {
  url: 'https://test.curo24.com/ws',
  userId: 'user123456',
  reconnectDelay: 5000,
  heartbeat: {
    incoming: 10000,
    outgoing: 10000
  }
};

// Create Context
const StompContext = createContext({
  client: null,
  connected: false,
  subscribe: () => {},
  publish: () => {},
  connectionStatus: 'disconnected'
});

export const StompProvider = ({ children }) => {
  const clientRef = useRef(null);
  const audioRef = useRef(null);
  const {userData}=useAuth()

  const [connectionState, setConnectionState] = useState({
    connected: false,
    status: 'disconnected',
    lastError: null
  });

  // Load sound on web
  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
  }, []);

  // WebSocket Initialization
  useEffect(() => {
    let mounted = true;

    const init = () => {
      const socket = new SockJS(`${WS_CONFIG.url}?userId=${WS_CONFIG.userId}`);

      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: WS_CONFIG.reconnectDelay,
        heartbeatIncoming: WS_CONFIG.heartbeat.incoming,
        heartbeatOutgoing: WS_CONFIG.heartbeat.outgoing,

        debug: msg => console.log('STOMP:', msg),

        onConnect: () => {
          if (mounted) {
            console.log('Connected to STOMP WebSocket');
            setConnectionState({
              connected: true,
              status: 'connected',
              lastError: null
            });
          }
        },

        onStompError: frame => {
          const errorMessage = frame.headers?.message || 'STOMP Error';
          console.error('STOMP ERROR:', errorMessage);

          if (mounted) {
            setConnectionState({
              connected: false,
              status: 'error',
              lastError: errorMessage
            });
          }
        },

        onDisconnect: () => {
          if (mounted) {
            setConnectionState({ connected: false, status: 'disconnected' });
          }
        },

        onWebSocketClose: () => {
          if (mounted) {
            setConnectionState({ connected: false, status: 'disconnected' });
          }
        }
      });

      client.activate();
      clientRef.current = client;
    };

    init();

    return () => {
      mounted = false;
      clientRef.current?.deactivate();
    };
  }, []);

  // Subscribe Handler
  const subscribe = (endpoint, callback) => {
    if (!clientRef.current?.connected) {
      console.warn('STOMP not connected');
      return null;
    }

    return clientRef.current.subscribe(endpoint, msg => {
      try {
        const body = JSON.parse(msg.body);

        // Play Sound
        if (audioRef.current) {
          audioRef.current.play().catch(() => {});
        }

        callback?.(body);
      } catch (e) {
        console.error('Message processing failed:', e);
      }
    });
  };

  // Publish Handler
  const publish = (endpoint, payload) => {
    if (!clientRef.current?.connected) {
      console.warn('Cannot publish, not connected');
      return;
    }

    clientRef.current.publish({
      destination: endpoint,
      body: JSON.stringify(payload)
    });
  };

  return (
    <StompContext.Provider
      value={{
        client: clientRef.current,
        connected: connectionState.connected,
        connectionStatus: connectionState.status,
        lastError: connectionState.lastError,
        subscribe,
        publish
      }}
    >
      {children}
    </StompContext.Provider>
  );
};

// Custom Hook
export const useStomp = () => useContext(StompContext);

// Subscription Hook
export const useStompSubscription = (endpoint, callback, deps = []) => {
  const { subscribe, connected } = useStomp();

  useEffect(() => {
    if (!connected || !endpoint) return;

    const sub = subscribe(endpoint, callback);

    return () => sub && sub.unsubscribe();
  }, [connected, endpoint, ...deps]);
};
