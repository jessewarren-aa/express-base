import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    value: ''
  },
  reducers: {
    setPage: (state, action) => { 
      window.localStorage.setItem('current-page', action.payload);
      state.value = action.payload; 
    },
    hidePage: state => { state.value = ''; },
  },
});

export const { 
  setPage, hidePage
} = pageSlice.actions;

export const selectPage = state => state.page.value;

export default pageSlice.reducer;
