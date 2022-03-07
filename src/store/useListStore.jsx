import create from 'zustand';
import produce from 'immer';

export const initialSongs = {
  songs: [],
  playlist: [],
  sortedList: [],
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

const updateSortedList = (set, newSortedList) => {
  return set(produce((draft) => {
    draft.list.sortedList = newSortedList;
  }));
};

const sort = (set, newSortParam) => {
  return set(produce((draft) => {
    draft.list.sortedBy = newSortParam;
  }));
};

const useListStore = create((set, get) => {
  return {
    list: initialSongs,
    updateSongs: (newSongs) => updateSongs(set, newSongs),
    updatePlaylist: (newPlayist) => updatePlaylist(set, newPlayist),
    sort: (newSortParam) => sort(set, newSortParam),
    updateSortedList: (newSortParam) => updateSortedList(set, newSortParam),
  };
});

export default useListStore;
