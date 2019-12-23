import React, { createContext, useReducer, useEffect, useState } from 'react';
import { UserReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, dispatch] = useReducer(UserReducer, {});

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    setToken(localStorage.getItem('token'));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, token, dispatch }}>
      { props.children }
    </UserContext.Provider>
  );
}

export default UserContextProvider;
