import {combineReducers} from "@reduxjs/toolkit";
import tiktokSlice from "./slices/tiktokSlice.ts";

const rootSlice = combineReducers({
    tiktok: tiktokSlice
});

export default rootSlice;
