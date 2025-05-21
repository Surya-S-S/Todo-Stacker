import { configureStore } from '@reduxjs/toolkit';
import updaterReducer from '../features/updaterSlice';
import tokenReducer from '../features/tokenSlice';

export default configureStore({
  reducer: {
    updater: updaterReducer,
    token: tokenReducer
  },
})