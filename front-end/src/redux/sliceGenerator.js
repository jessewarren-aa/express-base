import { createSlice } from '@reduxjs/toolkit';

const generateSlice = (name, local = true) => {
  const newSlice = createSlice({
    name,
    initialState: { errors: [] },
    reducers: {
      [`set${name[0].toUpperCase() + name.substring(1)}`]: 
        (state, action) => {
          if (action.payload.id !== `errors`) {
            state[action.payload.id] = action.payload;
          }
        },
      [`remove${name[0].toUpperCase() + name.substring(1)}`]: 
        (state, action) => {
          if (action.payload.id !== `errors`) {
            delete state[action.payload.key];
          }
        },
      [`error${name[0].toUpperCase() + name.substring(1)}`]: 
        (state, action) => {
          state.errors = action.payload;
        },
    }
  });

  newSlice.selectors = {};

  newSlice.selectors
      .selectErrors = state => state.errors;

    newSlice.selectors
      .selectAll = state => state[`${name}`];

  if (local) {
    newSlice.thunks = {};

    newSlice
      .thunks[`getOne${name[0].toUpperCase() + name.substring(1)}`] = 
        (auth_token, id) => async dispatch => {
          const result = await fetch(`http://localhost:5000/${name}/${id}`, {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth_token': auth_token
            }
          });
          const data = await result.json();
          if (!data.errors) {
            dispatch(newSlice
              .actions[`set${name[0].toUpperCase() + name.substring(1)}`]
              (data));
            return true;
          } else {
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };
    
    newSlice
      .thunks[`getAll${name[0].toUpperCase() + name.substring(1)}`] = 
        (auth_token) => async dispatch =>  {
          const result = await fetch(`http://localhost:5000/${name}`, {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth_token': auth_token
            }
          });
          const data = await result.json();
          if (!data.errors) {
            console.log(data)
            data.data.forEach(object => {
              dispatch(newSlice
                .actions[`set${name[0].toUpperCase() + name.substring(1)}`]
                (object));
            });
            return true;
          } else {
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };

    newSlice
      .thunks[`create${name[0].toUpperCase() + name.substring(1)}`] = 
        (auth_token, body) => async dispatch =>  {
          const result = await fetch(`http://localhost:5000/${name}`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth_token': auth_token
            },
            body: JSON.stringify(body)
          });
          const data = await result.json();
          if (!data.errors) {
            dispatch(newSlice
              .actions[`set${name[0].toUpperCase() + name.substring(1)}`]
              (data));
            return true;
          } else {
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };

    newSlice
      .thunks[`update${name[0].toUpperCase() + name.substring(1)}`] = 
        (auth_token, body) => async dispatch =>  {
          const result = await fetch(`http://localhost:5000/${name}/${body.id}`, {
            method: "PATCH",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth_token': auth_token,
            },
            body: JSON.stringify(body)
          });
          const data = await result.json();
          if (!data.errors) {
            dispatch(newSlice
              .actions[`set${name[0].toUpperCase() + name.substring(1)}`]
              (data));
            return true;
          } else {
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };

    newSlice
      .thunks[`destroy${name[0].toUpperCase() + name.substring(1)}`] = 
        (auth_token, id) => async dispatch =>  {
          const result = await fetch(`http://localhost:5000/${name}/${id}`, {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth_token': auth_token,
            }
          });
          const data = await result.json();
          if (!data.errors) {
            dispatch(newSlice
              .actions[`remove${name[0].toUpperCase() + name.substring(1)}`]
              (data));
            return true;
          } else {
            dispatch(newSlice
              .actions[`error${name[0].toUpperCase() + name.substring(1)}`]
              (data.errors));
            return false;
          };
        };
  }
  return newSlice;
}

export default generateSlice;
