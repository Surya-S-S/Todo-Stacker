import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    isExpired: false
  },
  reducers: {
    expire: (state) => {
        state.isExpired=true;
    },
    initialize: (state) => {
        state.isExpired=false;
    }
  },
})

export const { expire,initialize } = tokenSlice.actions
export default tokenSlice.reducer