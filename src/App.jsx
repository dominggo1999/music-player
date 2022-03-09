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
import useChooseDirectory from './hooks/useChooseDirectory';

const App = () => {
  const { send, receive } = window.api;
  const [libraryLoading, setLibraryLoading] = useState(true);
  const [libraryError, setLibraryError] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const updateActiveSong = useActiveSongStore((state) => state.updateActiveSong);
  const updateAutoplay = useActiveSongStore((state) => state.updateAutoplay);

  const updateSongs = useListStore((state) => state.updateSongs);
  const updateDirectory = useListStore((state) => state.updateDirectory);
  const updatePlaylist = useListStore((state) => state.updatePlaylist);
  const updateOrder = useListStore((state) => state.updateOrder);
  const sort = useListStore((state) => state.sort);
  const chooseDirectory = useChooseDirectory({ setLoading: setLibraryLoading, setError: setLibraryError });

  useEffect(() => {
    const getSavedData = async () => {
      try {
        const {
          files, activeSong, sortingSettings, directory,
        } = await send('first-render');

        updateSongs(files || []);
        updatePlaylist(files || []);
        updateOrder(files ? files.map((i) => i.path) : []);
        updateDirectory(directory || '');
        sort(sortingSettings[0] || {});

        const targetSongIndex = files.map((i) => i.path).indexOf(activeSong);

        if(targetSongIndex === -1) {
          const firstSong = files[0].path;
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
            <SingleSong
              loading={libraryLoading}
              chooseDirectory={chooseDirectory}
            />
          </Route>
          <Route
            exact
            path="/library"
          >
            <Library
              loading={libraryLoading}
              chooseDirectory={chooseDirectory}
            />
          </Route>
          <Route path="*">
            <SingleSong
              loading={libraryLoading}
              chooseDirectory={chooseDirectory}
            />
          </Route>
        </Switch>
      </MainWrapper>
      <Player loading={libraryLoading} />
    </AppWrapper>
  );
};

export default App;
