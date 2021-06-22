import React from 'react';
import styles from './NavBar.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { 
  selectSession,
  logoutCurrentUser
 } from '../../redux/sessionSlice';

 import {
  showModal,
  selectModal
} from '../../redux/modalSlice';

import { 
  selectUser
 } from '../../redux/userSlice';

 import { 
  setPage,
  selectPage
 } from '../../redux/pageSlice';

export function NavBar () {
  const currentSession = useSelector(selectSession);
  const authenticated = currentSession.auth_token.length > 0;
  const showSessionModal = useSelector(selectModal) === "session";
  const showSignUpModal = useSelector(selectModal) === "sign-up";
  const currentUser = useSelector(selectUser);
  const currentPage = useSelector(selectPage);
  const dispatch = useDispatch();

  const sessionButton = (
    <div
      className={styles.sessionButton}
      onMouseDown={(event) => {event.stopPropagation();}}
      onClick={(event) => {
        if (!showSessionModal && currentSession.auth_token.length === 0) {
          dispatch(showModal("session"));
        } else if (currentSession.auth_token.length > 0) {
          dispatch(logoutCurrentUser(currentSession.auth_token));
        }
      }}>
        {currentSession.auth_token.length > 0 
          ? "log out" 
          : "sign in"}
      </div>
  )
  const signUpButton = (
    authenticated 
      ? null
      : <div
          className={
            styles.sessionButton 
              + (authenticated ? styles.hidden : "")
          }
          onMouseDown={(event) => {event.stopPropagation();}}
          onClick={(event) => {
            if (!showSignUpModal && !authenticated) {
              dispatch(showModal("sign-up"));
            } 
          }}>sign up</div>
  )
  
  const welcomeMessage = (
    <span>
      {authenticated 
        ? currentUser.username.length > 0 
          ? `Hello, ${currentUser.username}.` 
          : ""
        : ""}
    </span>
  )

  const classes = [styles.navBarSection];
  const leftNavBarClasses = [...classes, styles.navBarLeftSection].join(" ");
  const rightNavBarClasses = [...classes, styles.navBarRightSection].join(" ");

  const createButton = (buttonName, key) => {
    return (
      authenticated
        ? <div
            key={`${buttonName}-${key}`}
            className={
              [styles.sessionButton,
                (authenticated ? "" : styles.hidden)].join(" ")
            }
            onMouseDown={(event) => {event.stopPropagation();}}
            onClick={(_) => {
              dispatch(setPage(buttonName));
            }}>{buttonName}</div>
        : null
    )
  }
        
  const navBarPageButtons = {
    "":[],
    "home":["test"],
    "test":["home"],
    "test":["test"]
  }

  let mappingPage = currentPage;
  if (currentPage.includes("-")) {
    mappingPage = currentPage.split("-")[0]
  }

  return (
    <div className={styles.navBar}>
      <div className={leftNavBarClasses}>
        {welcomeMessage}
        {navBarPageButtons[mappingPage].map((button, idx) => {
          if (currentPage.includes("-")) {
            return createButton(button, currentPage.split("-")[1]);
          } else {
            return createButton(button, idx);
          }
        })}
      </div>
      <div className={rightNavBarClasses}>
        {/* <div>notifs</div> */}
        {signUpButton}
        {sessionButton}
      </div>
    </div>
  )
}