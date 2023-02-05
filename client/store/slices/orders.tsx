import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  activePagination: 1,
  openChat: false,
  chatId: null,
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setActivePagination(state, action) {
      state.activePagination = action.payload
    },
    openChat(state,action) {
      state.openChat = true,
      state.chatId = action.payload
    },
    closeChat(state) {
      state.openChat = false
    },
  },
})

export const { openChat, closeChat } = ordersSlice.actions

export default ordersSlice.reducer
