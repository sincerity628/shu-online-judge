import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './tools/Router';
import Navbar from './components/Navbar';
import UserContextProvider from './contexts/UserContext';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserContextProvider>
          <Navbar  />
          <Router />
        </UserContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
