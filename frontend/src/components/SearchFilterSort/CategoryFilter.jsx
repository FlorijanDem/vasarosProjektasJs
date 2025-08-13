import React from "react";
import styles from "./CategoryFilter.module.css";

function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {
  return (
    <select
      className={styles.select}
      value={selectedCategories.length > 0 ? selectedCategories[0] : ""}
      onChange={(e) => {
        const val = e.target.value;
        console.log("Category selected:", val);

        if (val == "") {
          onCategoryChange([]);
        } else {
          onCategoryChange(val);
        }
      }}
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
