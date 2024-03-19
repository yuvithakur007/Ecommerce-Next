import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  darkMode: false,
};

export const DarkModeContext = createContext(initialState);

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DarkModeContext.Provider value={{ state, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const reducer = (state, action) => {
    localStorage.setItem('darkMode', JSON.stringify(!state.darkMode));
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
};

export default DarkModeContext;
