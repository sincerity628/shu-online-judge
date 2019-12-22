import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './tools/Router';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar  />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
