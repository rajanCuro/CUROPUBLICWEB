// src/redux/features/medicinePupolarSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Authorization/axiosInstance";

// Async thunk for fetching categories
export const fetchAllPopularCategory = createAsyncThunk(
  "popularCategory/fetchPopularCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("category/getAllCategories");
      return res.data; // always return data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch categories"
      );
    }
  }
);

const popularSlice = createSlice({
  name: "categoryPopular",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPopularCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPopularCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // fixed
      })
      .addCase(fetchAllPopularCategory.rejected, (state, action) => {
        state.loading = false;
        state.categories = []; // fixed
        state.error = action.payload;
      });
  },
});

// Export reducer only
export default popularSlice.reducer;
