import React, { useState } from 'react';
import LibraryTable from '../../layout/LibraryTable/LibraryTable';
import SearchBar from '../../layout/SearchBar/SearchBar';
import {
  TopSection, LibraryWrapper, LoadingText, LoadingIndicatorWrapper,
} from './Library.style';
import { Button } from '../../common/Button';
import useListStore from '../../store/useListStore';
import { SearchIndicator } from '../../common/LoadingIndicator';
import useActiveSongStore from '../../store/useActiveSongStore';

const Library = ({
  loading, setLoading, error, setError,
}) => {
  const { send } = window.api;

  const [displayedPlaylist, setDisplayedPlaylist] = useState();
  const [query, setQuery] = useState('');

  const playlist = useListStore((state) => state.list.playlist);
  const updatePlaylist = useListStore((state) => state.updatePlaylist);
  const sortingSettings = useListStore((state) => state.list.sortedBy);
  const updateSongs = useListStore((state) => state.updateSongs);
  const sort = useListStore((state) => state.sort);
  const updateActiveSong = useActiveSongStore((state) => state.updateActiveSong);
  const updateSortedList = useListStore((state) => state.updateSortedList);
  const updateDirectory = useListStore((state) => state.updateDirectory);

  const chooseDirectory = async () => {
    try {
      const { files, canceled, directory } = await send('select-dir');

      if(!canceled) {
        const firstSong = files[0].path;
        const defaultSortedIndex = Array.from(Array(files.length).keys()).map((item) => `${item}`);

        updateActiveSong(firstSong);
        updateSongs(files);
        updatePlaylist(files);
        updateSortedList(defaultSortedIndex);
        updateDirectory(directory);
        sort({});

        send('save-sorting-settings', {});
        send('save-active-song', firstSong);
        send('save-sorted-index', defaultSortedIndex);
      }
    } catch (error) {
      setError(error);
    }finally{
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    const q = e.target.value.trim().toLowerCase();
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
          handleChange={handleChange}
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
