import React from 'react';
import { StyledSearchBar } from './SearchBar.style';

const SearchBar = ({ handleChange }) => {
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
