import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import SortDropdown from "./SortDropdown";
import CardGrid from "../CardsGrid/CardsGrid";
import styles from "./SearchFilterSort.module.css";

const categoriesList = [
    "City Tours", 
    "Nature & Hiking", 
    "Food & Drink", 
    "History & Culture", 
    "Art & Street Life"
];

const sortOptions = [
  { value: "priceAsc", label: "Price ↑" },
  { value: "priceDesc", label: "Price ↓" },
//   { value: "titleAsc", label: "Name ↑" },
//   { value: "titleDesc", label: "Name ↓" },
];

function SearchFilterSort({ setSearchTerm, sortOption, setSortOption, selectedCategories, setSelectedCategories }) {

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <h2 className={styles.heading}>Search and filter excursions</h2>
        <div className={styles.controls}>
          <SearchInput onSearchChange={setSearchTerm} />
          <CategoryFilter
            categories={categoriesList}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
          <SortDropdown 
          options={sortOptions} 
          selectedOption={sortOption} 
          onSortChange={setSortOption} />
        </div>
      </div>
    </div>
  );
}

export default SearchFilterSort;
