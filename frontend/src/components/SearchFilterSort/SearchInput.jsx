import React from 'react';
import styles from './SearchInput.module.css';

function SearchInput({ onSearchChange }) {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Search by title"
      onChange={e => onSearchChange(e.target.value)}
    />
  );
}

export default SearchInput;
