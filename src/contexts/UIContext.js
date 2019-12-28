import React, { useState, createContext } from 'react';

export const UIContext = createContext();

const UIContextProvider = (props) => {
  const [dimmer, setDimmer] = useState(false);

  // use as a pair: true & false
  const toggleDimmer = (value) => {
    setDimmer(value);
  }

  return (
    <UIContext.Provider value={{ dimmer, toggleDimmer }}>
      { props.children }
    </UIContext.Provider>
  );
}

export default UIContextProvider;
