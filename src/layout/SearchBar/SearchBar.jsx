import React from 'react';
import { StyledSearchBar } from './SearchBar.style';

const SearchBar = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <StyledSearchBar>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search song"
      />
    </StyledSearchBar>
  );
};

export default SearchBar;
