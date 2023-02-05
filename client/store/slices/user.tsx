import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: false,
  token: null,
  email: null,
  type_id: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileData(state, action) {
      state.email = action.payload.email
      state.token = action.payload.token
      state.isLoggedIn = action.payload.isLoggedIn
      state.type_id = action.payload.type_id
    },
    removeProfileData(state) {
      state.email = null
      state.token = null
    },
  },
})

export const { setProfileData, removeProfileData } = userSlice.actions

export default userSlice.reducer
