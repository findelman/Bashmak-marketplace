import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  editingTitle: false,
  id: [],
}

const productsPopUp = createSlice({
  name: "productsPopUp",
  initialState,
  reducers: {
    editingTrue(state, action) {
      ;(state.editingTitle = true), (state.id = action.payload)
    },
    editingFalse(state) {
      ;(state.editingTitle = false), (state.id = [])
    },
  },
})

export const { editingTrue, editingFalse } = productsPopUp.actions

export default productsPopUp.reducer
