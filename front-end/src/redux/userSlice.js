import { createSlice } from '@reduxjs/toolkit';

import { 
  validateLogin 
} from './sessionSlice';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: ""
  },
  reducers: {
    setUser: (state, action) => { 
      state.username = action.payload.username;
    },
    clearUser: state => { 
      state.username = '';
    }
  },
});

export const { 
  setUser, clearUser
} = userSlice.actions;

export const getCurrentUser = (auth_token) => async dispatch => {
  const result = await fetch("http://localhost:5000/api/users", {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'auth_token': auth_token
    }
  })
  const data = await result.json()
  if (!data.response.includes("error")) {
    dispatch(setUser({ username: data.response }));
    return true;
  } else {
    return false;
  }
}

export const signUpUser = (user) => async dispatch => {
  const result = await fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  const data = await result.json()
  if (!data.response.includes("error")) {
    dispatch(validateLogin({username: user.username, password: user.password}))
    return true;
  } else {
    dispatch(clearUser());
    return false;
  }
}

export const selectUser = state => state.user;

export default userSlice.reducer;
