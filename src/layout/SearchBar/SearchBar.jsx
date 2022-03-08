import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { StyledSearchBar, ClearQueryButton } from './SearchBar.style';

const SearchBar = ({ changeQuery, query }) => {
  return (
    <StyledSearchBar>
      {
        query && (
          <ClearQueryButton onClick={() => changeQuery('')}>
            <AiOutlineClose />
          </ClearQueryButton>
        )
      }
      <input
        value={query}
        onChange={(e) => changeQuery(e.target.value)}
        type="text"
        placeholder="Search song"
      />
    </StyledSearchBar>
  );
};

export default SearchBar;
