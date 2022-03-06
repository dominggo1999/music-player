import React, { useState } from 'react';
import LibraryTable from '../../layout/LibraryTable/LibraryTable';
import SearchBar from '../../layout/SearchBar/SearchBar';
import {
  TopSection, LibraryWrapper, LoadingText, LoadingIndicatorWrapper,
} from './Library.style';
import { Button } from '../../common/Button';
import useListStore from '../../store/useListStore';
import { SearchIndicator } from '../../common/LoadingIndicator';

const Library = ({
  loading, setLoading, error, setError,
}) => {
  const { send } = window.api;
  const songs = useListStore((state) => state.list.songs);
  const updateSongs = useListStore((state) => state.updateSongs);

  const chooseDirectory = async () => {
    try {
      const { files, canceled } = await send('select-dir');

      if(!canceled) {
        updateSongs(files);
      }
    } catch (error) {
      setError(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <LibraryWrapper>
      <TopSection>
        <SearchBar />
        <Button
          disabled={loading}
          onClick={chooseDirectory}
        >
          Choose Directory
        </Button>
      </TopSection>
      {
       !loading && songs.length > 0 && <LibraryTable songs={songs} />
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
