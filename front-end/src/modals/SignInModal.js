import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SignInModal.module.css';

import {
  validateLogin,
  selectSessionError,
  selectSession,
  setAuthToken
} from '../redux/sessionSlice';

import {
  hideModal,
  selectModal
} from '../redux/modalSlice';

import {
  getCurrentUser
} from '../redux/userSlice';

import {
  setPage
} from '../redux/pageSlice';

export function SignInModal () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const currentSession = useSelector(selectSession);

  const showSessionModal = useSelector(selectModal) === "session";
  const dispatch = useDispatch();

  const sessionError = useSelector(selectSessionError);
  
  const [shown, setShown] = useState(showSessionModal ? styles.shown : "");

  useEffect(() => {
    const asyncValidateAuthToken = async (auth_token) => {
      const result = await fetch("http://localhost:5000/sessions/validate", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'auth_token': auth_token
        }
      })
      const data = await result.json()
      if (!data.errors) {
        if (currentSession.auth_token !== auth_token) {
          dispatch(setAuthToken({auth_token}));
          dispatch(getCurrentUser(auth_token));
          dispatch(setPage(
            window.localStorage.getItem('current-page') || ""
          ));
        }
        return true;
      } else {
        dispatch(setAuthToken({auth_token: ""}));
        return false;
      }
    }

    asyncValidateAuthToken(window.localStorage.getItem('auth-token'));
  })

  useEffect(() => {
    if (showSessionModal) {
      setShown((showSessionModal ? styles.shown : ""));
    } 
  }, [showSessionModal])

  if (showSessionModal && shown.length === 0) {
    return null;
  }

  const classes = ["animate__animated", "animate__faster", styles.signInModal];
  const fadeInClasses = [...classes, "animate__fadeIn", shown].join(" ");

  const returnValue = (
    <div 
      className={ showSessionModal ? fadeInClasses : styles.signInModal }
      onMouseDown={(event) => {event.stopPropagation();}}
      >
        <form 
          onSubmit={(event) => {
            event.preventDefault()
          }}
          autoComplete="off">
          <input 
            value={username}
            placeholder="username"
            autoComplete="off"
            onChange={(event) => {
              setUsername(event.target.value)
            }}></input>

          <input 
            value={password}
            type="password"
            autoComplete="off"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value)
            }}></input>

          <input
            className={styles.hidden}
            type="submit"></input>

          <button 
            type="button"
            onClick={async (_) => {
              const success = await dispatch(validateLogin({
                username, password
              }));
              // console.log(success)
              if (success) { 
                dispatch(hideModal("session")); 
              }
            }}>sign in</button>
          <div className={styles.errorMessage}>{sessionError}</div>
        </form>
      </div>
  )

  return returnValue;
}