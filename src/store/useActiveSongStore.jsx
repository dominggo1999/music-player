import create from 'zustand';
import produce from 'immer';

export const initialActiveSong = {
  isPlay: false,
  path: '',
};

const updateActiveSong = (set, newValue) => {
  return set(produce((draft) => {
    draft.activeSong.path = newValue;
  }));
};

const useActiveSongStore = create((set, get) => {
  return {
    activeSong: initialActiveSong,
    updateActiveSong: (newValue) => updateActiveSong(set, newValue),
  };
});

export default useActiveSongStore;
