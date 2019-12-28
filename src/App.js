import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './tools/Router';
import Navbar from './components/Navbar';
import UserContextProvider from './contexts/UserContext';
import UIContextProvider from './contexts/UIContext';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserContextProvider>
          <UIContextProvider>
            <Navbar  />
            <div className="box">
              <Router />
            </div>
          </UIContextProvider>  
        </UserContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
