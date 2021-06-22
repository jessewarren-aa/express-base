import styles from './modal.module.css';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const generateModal = ({
  arrayOfInputs, 
  authRequired, 
  authTokenSelector,
  currentModalSelector,
  hideModal,
  modalName,
  slicePostThunk, 
}) => {
  const NewModal = () => {
    const auth_token = useSelector(authTokenSelector);
    const dispatch = useDispatch();
    const showModal = useSelector(currentModalSelector) === modalName;

    const state = {};

    if (!showModal) return null;
    if (authRequired && !auth_token) return null; 

    arrayOfInputs.forEach(input => {
      state[input.name] = useState(null);
    });

    const formBody = Object.entries(state)
      .map(entry => { return [entry[0], entry[1][0]] })
      .reduce((acc, cur) => { 
        acc[cur[0]] = cur[1]; 
        return acc; 
      }, {});

    const formHtml = (
      <div 
        onMouseDown={(e) => { e.stopPropagation(); }}
        className={styles.modal}>
        <form>
          {arrayOfInputs.map(input => {
            return (
              <input
                autoComplete="off"
                onChange={(e) => { state[input.name][1](e.target.value); }}
                placeholder={input.placeholder}
                value={state[input.name][0]}
                ></input>
            )})}
          <input 
            className={styles.hidden}
            >Hidden enter input
            </input> 
          <button
            onClick={async (_) => {
              const success = await dispatch(slicePostThunk(
                auth_token, 
                formBody
                ));
              if (success) dispatch(hideModal(modalName)); 
            }}
            ></button>
        </form>
      </div>
    );

    return formHtml;

  }

  return NewModal;


};