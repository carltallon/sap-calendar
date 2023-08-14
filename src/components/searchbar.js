import React, { useState } from 'react';
import './searchbar.css';

 

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

 

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

 

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery('');
  };

 

  return (
  <form className="search-container" onSubmit={handleSearchSubmit}>
    <input
          type="text"
          className="searchbar"
          placeholder="Search for an Event.."
          value={searchQuery}
          onChange={handleSearchChange}
        />
    <button type="submit"><i className="fa fa-search"></i></button>
  </form>
  );
};

 

export default SearchBar;