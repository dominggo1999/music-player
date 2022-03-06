import create from 'zustand';
import produce from 'immer';

export const initialSongs = {
  songs: [],
  sortedBy: null,
  directory: '',
};

const updateSongs = (set, newSongs) => {
  return set(produce((draft) => {
    draft.list.songs = newSongs;
  }));
};

const sort = (set, newSortParam) => {
  return set(produce((draft) => {
    draft.sortedBy = newSortParam;
  }));
};

const useListStore = create((set, get) => {
  return {
    list: initialSongs,
    updateSongs: (newSongs) => updateSongs(set, newSongs),
    sort: (newSortParam) => sort(set, newSortParam),
  };
});

export default useListStore;
