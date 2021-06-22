import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SignUpModal.module.css';

import {
  selectModal,
  hideModal
} from '../redux/modalSlice';

import { signUpUser } from '../redux/userSlice';

export function SignUpModal () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const showSignUpModal = useSelector(selectModal) === "sign-up";
  const dispatch = useDispatch();
  
  const [shown, setShown] = useState(showSignUpModal ? styles.shown : "");

  useEffect(() => {
    if (showSignUpModal) {
      setShown((showSignUpModal ? styles.shown : ""));
    } 
  }, [showSignUpModal])

  if (showSignUpModal && shown.length === 0) {
    return null;
  }

  const classes = ["animate__animated", "animate__faster", styles.signInModal];
  const fadeInClasses = [...classes, "animate__fadeIn", shown].join(" ");

  const returnValue = (
    <div 
      className={ showSignUpModal ? fadeInClasses : styles.signInModal }
      onMouseDown={(event) => {event.stopPropagation();}}
      >
        <form 
          onSubmit={(event) => {
            event.preventDefault()
          }}
          autoComplete="off">

          <input 
            value={username}
            placeholder="pseudonym"
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
            value={verifyPassword}
            type="password"
            autoComplete="off"
            placeholder="verify password"
            onChange={(event) => {
              setVerifyPassword(event.target.value)
            }}></input>

          <input
            className={styles.hidden}
            type="submit"></input>

          <button 
            type="button"
            onClick={async (_) => {
              if (password === verifyPassword) {
                const result = await dispatch(signUpUser({username, password}))
                if (result) { 
                  dispatch(hideModal("session")); 
                }
              }
            }}>sign up</button>
        </form>
      </div>
  )

  return returnValue;
}