import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: null,
  height: null,
  isMobile: null,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevice(state, action) {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.isMobile = action.payload.isMobile;
    },
    removeDevice(state) {
      state.width = null;
      state.height = null;
      state.isMobile = null;
    },
  },
});

export const { setDevice, removeDevice } = deviceSlice.actions;

export default deviceSlice.reducer;
