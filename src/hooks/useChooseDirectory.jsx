import React from 'react';
import useListStore from '../store/useListStore';
import useActiveSongStore from '../store/useActiveSongStore';

const useChooseDirectory = ({ setLoading, setError }) => {
  const { send } = window.api;

  const updatePlaylist = useListStore((state) => state.updatePlaylist);
  const updateSongs = useListStore((state) => state.updateSongs);
  const sort = useListStore((state) => state.sort);
  const updateActiveSong = useActiveSongStore((state) => state.updateActiveSong);
  const updateIsPlay = useActiveSongStore((state) => state.updateIsPlay);
  const updateDirectory = useListStore((state) => state.updateDirectory);
  const updateOrder = useListStore((state) => state.updateOrder);

  const chooseDirectory = async () => {
    try {
      const { files, canceled, directory } = await send('select-dir');

      if(!canceled) {
        const filesExist = files?.length > 0;

        const firstSong = filesExist ? files[0].path : '';
        const defaultSortedIndex = Array.from(Array(files.length).keys()).map((item) => `${item}`);

        updateActiveSong(firstSong || '');
        updateSongs(filesExist ? files : []);
        updatePlaylist(filesExist ? files : []);
        updateOrder(filesExist ? files.map((i) => i.path) : []);
        updateDirectory(directory || '');
        updateIsPlay(false);
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
