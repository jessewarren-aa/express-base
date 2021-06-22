import React from 'react';
import styles from './Home.module.css';

import { useSelector } from 'react-redux';
import { selectSession } from '../../redux/sessionSlice';

export default function Home () {
  const currentSession = useSelector(selectSession);
  const sessionNull = currentSession.auth_token === null;

  if (sessionNull) {
    return null;
  }
  const authenticated = currentSession.auth_token.length > 0;

  const returnValue = (
    <div className={styles.homeRoute}>
      <div>Home Page</div>
      test
    </div>
  )

  return authenticated ? returnValue : null;
}