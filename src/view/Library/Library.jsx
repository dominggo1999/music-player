import React, { useState } from 'react';
import LibraryTable from '../../layout/LibraryTable/LibraryTable';
import SearchBar from '../../layout/SearchBar/SearchBar';
import {
  TopSection, LibraryWrapper,
} from './Library.style';
import { Button } from '../../common/Button';
import useListStore from '../../store/useListStore';
import { SearchIndicator, LoadingIndicatorWrapper, LoadingText } from '../../common/LoadingIndicator';
import NoLibraryMessage from '../../layout/NoLibraryMessage/NoLibraryMessage';

const Library = ({
  loading, chooseDirectory,
}) => {
  const [displayedPlaylist, setDisplayedPlaylist] = useState();
  const [query, setQuery] = useState('');

  const playlist = useListStore((state) => state.list.playlist);
  const updatePlaylist = useListStore((state) => state.updatePlaylist);
  const sortingSettings = useListStore((state) => state.list.sortedBy);

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

  if(loading) {
    return (
      <LoadingIndicatorWrapper>
        <SearchIndicator />
        <LoadingText>Scanning folder..</LoadingText>
      </LoadingIndicatorWrapper>
    );
  }

  if(!playlist.length) {
    return (
      <NoLibraryMessage chooseDirectory={chooseDirectory} />
    );
  }

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
    </LibraryWrapper>
  );
};

export default Library;
