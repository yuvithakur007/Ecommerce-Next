import "@/styles/globals.css";
import React, { useState, useReducer, useEffect } from 'react';
import { DarkModeContext, reducer } from '../context/DarkModeContext'
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('None');

  // Initialize darkMode state
  const initialState = {
    darkMode: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Load darkMode state from localStorage if available
  useEffect(() => {
    const savedDarkMode = window.localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      dispatch({ type: 'TOGGLE_DARK_MODE', payload: savedDarkMode === 'true' });
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterByCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSortBy = (e) => {
    setSort(e.target.value);
  };

  // Spread state variables and handler functions as props
  const componentProps = {
    ...pageProps,
    search,
    category,
    sort,
    handleSearch,
    handleFilterByCategory,
    handleSortBy,
  };

  return (
    <DarkModeContext.Provider value={{state, dispatch}}>
      <Header />
      <Component {...componentProps} />
    </DarkModeContext.Provider>
  );
}
