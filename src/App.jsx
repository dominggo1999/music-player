import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppWrapper } from './common/AppWrapper';
import Player from './layout/Player/Player';
import { MainWrapper } from './common/MainWrapper';
import Header from './layout/Header/Header';
import SingleSong from './view/SingleSong/SingleSong';
import Library from './view/Library/Library';
import useActiveSongStore from './store/useActiveSongStore';
import useListStore from './store/useListStore';

const App = () => {
  const { send, receive } = window.api;
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const updateSongs = useListStore((state) => state.updateSongs);
  const updateActiveSong = useActiveSongStore((state) => state.updateActiveSong);
  const updateAutoplay = useActiveSongStore((state) => state.updateAutoplay);
  const updateDirectory = useListStore((state) => state.updateDirectory);
  const updatePlaylist = useListStore((state) => state.updatePlaylist);
  const sort = useListStore((state) => state.sort);
  const updateSortedList = useListStore((state) => state.updateSortedList);

  useEffect(() => {
    const getSavedData = async () => {
      try {
        const {
          files, activeSong, sortingSettings, sortedListIndex, directory,
        } = await send('first-render');

        updateSongs(files.files);
        updatePlaylist(files.files);
        updateSortedList(sortedListIndex);
        updateDirectory(directory);
        sort(sortingSettings[0] || {});

        // Check if active song still exist in songs

        const targetSongIndex = files.files.map((i) => i.path).indexOf(activeSong);
        if(targetSongIndex === -1) {
          const firstSong = files.files[0].path;
          updateActiveSong(firstSong);
        }else{
          updateActiveSong(activeSong);
        }
      } catch (error) {
        setError(error);
      }finally{
        setLoading(false);
        setLibraryLoading(false);
      }
    };

    getSavedData();

    const scanningFile = (msg) => {
      if(msg === 'scanning-folder') {
        setLibraryLoading(true);
        updateAutoplay(false);
      }
    };

    const unsubscribe = receive('scanning-folder', scanningFile);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppWrapper>
      <MainWrapper>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
          >
            <SingleSong />
          </Route>
          <Route
            exact
            path="/library"
          >
            <Library
              setLoading={setLibraryLoading}
              setError={setLibraryError}
              loading={libraryLoading}
              error={libraryError}
            />
          </Route>
        </Switch>
      </MainWrapper>
      <Player />
    </AppWrapper>
  );
};

export default App;
