import React from "react";
import styles from "../styles/sidebar.module.css"; 
import { useDarkMode } from '../context/DarkModeContext'; 

export default function SideBar({
  handleSearch,
  handleSortBy,
  handleFilterByCategory,
}) {
  const { state } = useDarkMode(); 

  const categories = [
    "All",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
  ];
  const sortingOptions = [
    "None",
    "Price: Low to High",
    "Price: High to Low",
    "Rating: Low to High",
    "Rating: High to Low",
  ];

  return (
    <div className={state.darkMode ? styles.darkMode : styles.lightMode}>
      <div className={styles.sidebar}>
        <div className={styles.sideBarDisplay}>
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
          />

          <select onChange={handleFilterByCategory}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select onChange={handleSortBy}>
            {sortingOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
