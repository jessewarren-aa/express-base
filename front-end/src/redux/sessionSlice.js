import { createSlice } from '@reduxjs/toolkit';

import { 
  getCurrentUser, 
  clearUser 
} from './userSlice';

import { 
  setPage
} from './pageSlice';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    auth_token: null,
    error: ''
  },
  reducers: {
    setAuthToken: (state, action) => { 
      state.auth_token = action.payload.auth_token;
    },
    clearAuthToken: state => { 
      state.auth_token = '';
      state.error = ''; 
    },
    setError: (state, action) => {
      state.error = action.payload; 
    },
    clearError: state => {
      state.error = '';
    }
  },
});

export const { 
  setAuthToken, clearAuthToken, setError, clearError
} = sessionSlice.actions;

export const validateLogin = ({username, password}) => async dispatch => {
  const result = await fetch("http://localhost:5000/api/sessions/login", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  const data = await result.json()
  if (!data.response.includes("error")) {
    dispatch(setAuthToken({
      auth_token: data.response
    }));
    dispatch(getCurrentUser(data.response));
    dispatch(setPage("home"));
    window.localStorage.setItem("auth-token", data.response);
    return true;
  } else {
    dispatch(setError(data["data"].split(" - ")[1]));
    // window.localStorage.removeItem("auth-token", data.response);
    return false;
  }
};

export const logoutCurrentUser = (auth_token) => async dispatch => {
  const result = await fetch("http://localhost:5000/api/sessions/logout", {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'auth_token': auth_token
    }
  })
  const data = await result.json()
  if (!data.response.includes("error")) {
    dispatch(clearAuthToken());
    dispatch(clearUser());
    // window.localStorage.removeItem("auth-token", data.response);
    return true;
  } else {
    dispatch(setError(data.response.split(" - ")[1]));
    // window.localStorage.removeItem("auth-token", data.response);
    return false;
  }
}

export const selectSession = state => state.session;
export const selectSessionError = state => state.session.error;

export default sessionSlice.reducer;
