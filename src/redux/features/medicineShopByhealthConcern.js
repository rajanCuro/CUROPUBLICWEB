// src/redux/features/medicineShopByhealthConcern.js
// src/redux/features/medicinePupolarSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Authorization/axiosInstance";

// Async thunk for fetching categories
export const fetchAllhealthConcern = createAsyncThunk(
  "fetchAllhealthConcern",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/endUserEndPoint/getHealthConcernList");
      return res.data; // always return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch categories"
      );
    }
  }
);

const healthConcernSlice = createSlice({
  name: "categoryPopular",
  initialState: {
    healthConcernList: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllhealthConcern.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllhealthConcern.fulfilled, (state, action) => {       
        state.loading = false;
        state.healthConcernList = action.payload; // fixed
      })
      .addCase(fetchAllhealthConcern.rejected, (state, action) => {
        state.loading = false;
        state.healthConcernList = []; // fixed
        state.error = action.payload;
      });
  },
});

// Export reducer only
export default healthConcernSlice.reducer;
