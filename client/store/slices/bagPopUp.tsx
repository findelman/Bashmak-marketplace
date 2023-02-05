import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  show: false,
  id: null,
  section: null,
}

const bagPopUpSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    showBag(state, action) {
      ;(state.show = true), (state.id = action.payload.id), (state.section = action.payload.section)
    },
    closeBag(state) {
      ;(state.show = false), (document.body.style.overflow = "auto")
    },
  },
})

export const { showBag, closeBag } = bagPopUpSlice.actions

export default bagPopUpSlice.reducer
