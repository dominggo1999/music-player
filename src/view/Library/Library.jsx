import React, { useState } from 'react';
import LibraryTable from '../../layout/LibraryTable/LibraryTable';
import SearchBar from '../../layout/SearchBar/SearchBar';
import {
  TopSection, LibraryWrapper, LoadingText, LoadingIndicatorWrapper,
} from './Library.style';
import { Button } from '../../common/Button';
import useListStore from '../../store/useListStore';
import { SearchIndicator } from '../../common/LoadingIndicator';

import useChooseDirectory from '../../hooks/useChooseDirectory';

const Library = ({
  loading, setLoading, error, setError,
}) => {
  const [displayedPlaylist, setDisplayedPlaylist] = useState();
  const [query, setQuery] = useState('');

  const playlist = useListStore((state) => state.list.playlist);
  const updatePlaylist = useListStore((state) => state.updatePlaylist);
  const sortingSettings = useListStore((state) => state.list.sortedBy);

  const chooseDirectory = useChooseDirectory({ setLoading, setError });

  const changeQuery = (query) => {
    setQuery(query);
    const q = query.trim().toLowerCase();
    if(q) {
      const filteredPlaylist = playlist.filter((item) => {
        return item.title.toLowerCase().indexOf(q) !== -1;
      });
      setDisplayedPlaylist(filteredPlaylist);
    }else{
      updatePlaylist(playlist);
    }
  };

  if(sortingSettings === '') return null;

  return (
    <LibraryWrapper>
      <TopSection>
        <SearchBar
          query={query}
          changeQuery={changeQuery}
        />
        <Button
          disabled={loading}
          onClick={chooseDirectory}
        >
          Choose Directory
        </Button>
      </TopSection>
      {
        !loading && playlist.length > 0 && (
        <LibraryTable
          sortingSettings={sortingSettings}
          query={query}
          playlist={query ? displayedPlaylist : playlist}
        />
        )
      }
      {
        loading && (
          <LoadingIndicatorWrapper>
            <SearchIndicator />
            <LoadingText>Scanning folder..</LoadingText>
          </LoadingIndicatorWrapper>
        )
      }
    </LibraryWrapper>
  );
};

export default Library;
