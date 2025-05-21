import { createSlice } from '@reduxjs/toolkit'

export const updaterSlice = createSlice({
  name: 'updater',
  initialState: {
    isUpdated: 'false'
  },
  reducers: {
    update: (state) => {
        if(state.isUpdated==='true') state.isUpdated='false';
        else state.isUpdated='true';
    },
  },
})

export const { update } = updaterSlice.actions
export default updaterSlice.reducer