// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "./features/addressSlice";
import packagesReducer from "./features/labSilice";
import medicineReducer from "./features/medicinePupolarSlice";
import healthConcerReducer from "./features/medicineShopByhealthConcern";

export const store = configureStore({
  reducer: {
    address: addressReducer,
    packages: packagesReducer,
    medicineCtaegory: medicineReducer,
    healthConcern: healthConcerReducer,
  },
});
