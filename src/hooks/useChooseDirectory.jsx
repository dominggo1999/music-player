import React from 'react';
import useListStore from '../store/useListStore';
import useActiveSongStore from '../store/useActiveSongStore';

const useChooseDirectory = ({ setLoading, setError }) => {
  const { send } = window.api;

  const updatePlaylist = useListStore((state) => state.updatePlaylist);
  const sortingSettings = useListStore((state) => state.list.sortedBy);
  const updateSongs = useListStore((state) => state.updateSongs);
  const sort = useListStore((state) => state.sort);
  const updateActiveSong = useActiveSongStore((state) => state.updateActiveSong);
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

  return chooseDirectory;
};

export default useChooseDirectory;
