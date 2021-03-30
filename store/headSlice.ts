import { createSlice } from '@reduxjs/toolkit';

export type HeadState = {
  title: string | null,
};

const initialState: HeadState = {
  title: null,
};

export const headSlice = createSlice({
  name: 'head',
  initialState,
  reducers: {
    setTitle(state, action: {payload: string | null}) {
      state.title = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  setTitle,
} = headSlice.actions;

export default headSlice.reducer;