import { createSlice } from '@reduxjs/toolkit';

export type ApiState = {
  callingCount: number,
  meta: Record<string, any> | null,
};

const initialState: ApiState = {
  callingCount: 0,
  meta: null,
};

export const headSlice = createSlice({
  name: 'head',
  initialState,
  reducers: {
    incrementCalling(state, action: {payload?: number}) {
      state.callingCount += action.payload ?? 1;
    },
    decrementCalling(state, action: { payload?: number }) {
      state.callingCount -= action.payload ?? 1;
    },
    setMeta(state, action: { payload: any }) {
      state.meta = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  incrementCalling,
  decrementCalling,
  setMeta,
} = headSlice.actions;

export default headSlice.reducer;