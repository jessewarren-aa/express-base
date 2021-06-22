import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import modalReducer from './modalSlice';
import pageReducer from './pageSlice';
import userReducer from './userSlice';

import sliceGenerator from './sliceGenerator';

// export const modalSlice = sliceGenerator("modal", false);\
export const modalSlice = modalReducer;
// export const pageSlice = sliceGenerator("page", false);
// export const usersSlice = sliceGenerator("users");

export default configureStore({
  reducer: {
    modal: modalReducer,
    page: pageReducer,
    session: sessionReducer,
    user: userReducer,
  },
});
