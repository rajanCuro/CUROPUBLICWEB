// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Authorization/AuthContext.jsx'
import { LabAuthProvider } from './Authorization/LabAuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import 'primereact/resources/themes/lara-light-cyan/theme.css';

createRoot(document.getElementById('root')).render(
  <StrictMode  >
    <Provider store={store}>
      <BrowserRouter>
        <LabAuthProvider>
          <AuthProvider>
            <ToastContainer />
            <App />
          </AuthProvider>
        </LabAuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode >,
)
