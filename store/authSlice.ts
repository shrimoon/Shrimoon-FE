import { IUser } from '@/models/user';
import { createSlice } from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null | undefined,
  myselfCache: IUser | null,
};

const initialState: AuthState = {
  token: undefined,
  myselfCache: null,
};

export const headSlice = createSlice({
  name: 'head',
  initialState,
  reducers: {
    setToken(state, {payload: token} : { payload: string | null }) {
      state.token = token;
      console.log(token);
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    setMyselfCache(state, { payload: cache }: { payload: User | null }) {
      state.myselfCache = cache;
      if (cache) {
        localStorage.setItem('myselfCache', JSON.stringify(cache));
      } else {
        localStorage.removeItem('myselfCache');
      }
    },
    sync(state) {
      state.token = localStorage.getItem('token');
      state.myselfCache = JSON.parse(localStorage.getItem('myselfCache') ?? 'null');
    },
  }
});

export const {
  setToken, setMyselfCache, sync,
} = headSlice.actions;

export default headSlice.reducer;