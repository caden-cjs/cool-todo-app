import React from 'react';
import { FilterType } from '../../types/todo';
import './FilterButtons.css';

interface FilterButtonsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, onFilterChange }) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-buttons">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn ${filter === key ? 'active' : ''}`}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};