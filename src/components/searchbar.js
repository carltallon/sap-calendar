import React, { useState } from 'react';
import './searchbar.css';

const SearchBar = ({ allEvents, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        class = "searchbar"
        placeholder="Search for an Event.."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
