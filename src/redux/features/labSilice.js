// src/redux/features/labSilice.js
// src/redux/features/labSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Authorization/axiosInstance";

// ------------------------------------------
// 1) FETCH POPULAR PACKAGES
// ------------------------------------------
export const fetchPopularPackages = createAsyncThunk(
  "packages/fetchPopularPackages",
  async (
    { pageSize, pageNumber, latitude, longitude, distance },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/endUserEndPoint/getPopularPackages?pageSize=${pageSize}&pageNumber=${pageNumber}&lat=${latitude}&lng=${longitude}&distance=${distance}`
      );

      return response.data?.dtoList || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch packages"
      );
    }
  }
);

// ------------------------------------------
// 2) FIXED: FETCH TEST BY VITAL ORGAN
// ------------------------------------------
export const fetchTestByVitalOrgan = createAsyncThunk(
  "packages/fetchTestByVitalOrgan",
  async ({ latitude, longitude, distance }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/labUser/labTestCount?lat=${latitude}&lan=${longitude}&distance=${distance}`
      );

      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organ tests"
      );
    }
  }
);

// ------------------------------------------
// Slice
// ------------------------------------------
const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    packages: [],
    organList: [],
    loading: false,
    error: null,
    pageNumber: 1,
  },

 

  extraReducers: (builder) => {
    builder
      // -------------------------------
      // Popular Packages
      // -------------------------------
      .addCase(fetchPopularPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPopularPackages.fulfilled, (state, action) => {
        state.loading = false;

        if (state.pageNumber === 1) {
          state.packages = action.payload;
        } else {
          state.packages = [...state.packages, ...action.payload];
        }
      })

      .addCase(fetchPopularPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------------
      // Vital Organ Test Fetch
      // -------------------------------
      .addCase(fetchTestByVitalOrgan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTestByVitalOrgan.fulfilled, (state, action) => {
        state.loading = false;
        state.organList = action.payload;
      })

      .addCase(fetchTestByVitalOrgan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPackages, nextPage } = packagesSlice.actions;
export default packagesSlice.reducer;
