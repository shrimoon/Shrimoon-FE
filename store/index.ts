import { configureStore } from '@reduxjs/toolkit';
import headReducer, { HeadState } from '@/store/headSlice';
import apiReducer, { ApiState } from '@/store/apiSlice';
import authReducer, { AuthState } from '@/store/authSlice';

export default configureStore({
  reducer: {
    head: headReducer,
    api: apiReducer,
    auth: authReducer,
  }
});

export interface RootState {
  head: HeadState,
  api: ApiState,
  auth: AuthState,
}