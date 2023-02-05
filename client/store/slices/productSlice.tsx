import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
  },
  reducers: {
    setProductData(state, action) {
      state.data = action.payload
    },
  },
})

export const { setProductData } = productSlice.actions

export const productReducer = productSlice.reducer
