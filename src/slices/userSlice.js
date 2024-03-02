import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: !!localStorage.getItem("edunexa_token"),
    token: localStorage.getItem("edunexa_token"),
    userInfo: {
      id: '',
      firstName: '',
      lastName: '',
      role: '',
    },
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem("edunexa_token", action.payload)
    },
    setUserInfo: (state, action) => {
      let {id, firstName, lastName, role} = action.payload
      state.userInfo.id = id
      state.userInfo.firstName = firstName
      state.userInfo.lastName = lastName
      state.userInfo.role = role
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer