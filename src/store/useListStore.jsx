import create from 'zustand';
import produce from 'immer';

export const initialSongs = {
  songs: [],
  playlist: [],
  order: [],
  sortedBy: '',
  directory: '',
};

const updateSongs = (set, newSongs) => {
  return set(produce((draft) => {
    draft.list.songs = newSongs;
  }));
};

const updatePlaylist = (set, newPlaylist) => {
  return set(produce((draft) => {
    draft.list.playlist = newPlaylist;
  }));
};

const sort = (set, newSortParam) => {
  return set(produce((draft) => {
    draft.list.sortedBy = newSortParam;
  }));
};

const updateDirectory = (set, newDirectory) => {
  return set(produce((draft) => {
    draft.list.directory = newDirectory;
  }));
};

const updateOrder = (set, newOrder) => {
  return set(produce((draft) => {
    draft.list.order = newOrder;
  }));
};

const useListStore = create((set, get) => {
  return {
    list: initialSongs,
    updateSongs: (newSongs) => updateSongs(set, newSongs),
    updatePlaylist: (newPlayist) => updatePlaylist(set, newPlayist),
    sort: (newSortParam) => sort(set, newSortParam),
    updateDirectory: (newDirectory) => updateDirectory(set, newDirectory),
    updateOrder: (newDirectory) => updateOrder(set, newDirectory),
  };
});

export default useListStore;
