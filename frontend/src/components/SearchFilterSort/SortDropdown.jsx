import React from 'react';
import styles from './SortDropdown.module.css';

function SortDropdown({ options, selectedOption, onSortChange }) {
  return (
    <select
      className={styles.sortDropdown}
      value={selectedOption}
      onChange={e => onSortChange(e.target.value)}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default SortDropdown;
