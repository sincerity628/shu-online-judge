import React, { useState, createContext } from 'react';

export const UIContext = createContext();

const initDimmerMsg = {
  isShow: false,
  content: 'dimmer msg'
};

const UIContextProvider = (props) => {
  const [dimmer, setDimmer] = useState(false);
  // set inverted to false if want to show the dimmer msg
  const [inverted, setInverted] = useState(true);
  const [dimmerMsg, setDimmerMsg] = useState(initDimmerMsg);
  // use as a pair: true & false
  const toggleDimmer = (value) => {
    setDimmer(value);
  };
  const toggleInverted = (value) => {
    setInverted(value);
  }
  const toggleDimmerMsg = (value) => {
    setDimmerMsg(value);
  };

  return (
    <UIContext.Provider
      value={{
        dimmer, toggleDimmer,
        inverted, toggleInverted,
        dimmerMsg, toggleDimmerMsg
      }}
    >
      { props.children }
    </UIContext.Provider>
  );
}

export default UIContextProvider;
