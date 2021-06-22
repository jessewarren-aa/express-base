import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: ''
  },
  reducers: {
    showModal: (state, action) => { state.value = action.payload; },
    hideModal: state => { state.value = ''; },
  },
});

export const { 
  showModal, hideModal
} = modalSlice.actions;

export const selectModal = state => state.modal.value;

export default modalSlice.reducer;
