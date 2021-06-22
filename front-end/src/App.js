import React, { useEffect } from 'react';
import { NavBar } from './features/navbar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import modals from './modals'
import routes from './routes'
import './Reset.css';
import './Fonts.css';
import './App.css';
import './animate.min.css';

import {
  selectModal
} from './redux/modalSlice';

import {
  selectPage
} from './redux/pageSlice';

import {
  selectSession
} from './redux/sessionSlice';

import { 
  modalSlice,
  pageSlice,
  sessionSlice
} from './redux/store'

function App() {
  const dispatch = useDispatch();

  const currentSession = useSelector(selectSession);
  const sessionNull = currentSession.auth_token === null;

  useEffect(() => {
    
  })

  const currentPage = useSelector(selectPage);
  let mappingPage = currentPage;
  if (currentPage.includes("-")) {
    mappingPage = currentPage.split("-")[0]
  }

  const currentModal = useSelector(state => state.modal);

  const modalsNames = [
    "session",
    "sign-up"
  ];

  const clearModals = () => {
    modalsNames.forEach(modal => { dispatch(modalSlice(modal)); });
  };
  
  return (
    <div 
      onMouseDown={(_) => { 
        if (currentModal.length > 0) {
          clearModals() 
        }
      }}
      className="App">
        {Object.values(modals).map((Modal, idx) => {
          return <Modal key={`modal-${idx}`} />
        })}
        {sessionNull ? null : <NavBar />}
        {routes(mappingPage)}
    </div>
  );
}

export default App;
