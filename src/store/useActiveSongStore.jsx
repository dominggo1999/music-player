import create from 'zustand';
import produce from 'immer';

export const initialActiveSong = {
  isPlay: false,
  path: '',
  isAutoplay: false,
};

const updateActiveSong = (set, newValue) => {
  return set(produce((draft) => {
    draft.activeSong.path = newValue;
  }));
};

const updateAutoplay = (set, newValue) => {
  return set(produce((draft) => {
    draft.activeSong.isAutoplay = newValue;
  }));
};

const updateIsPlay = (set, newValue) => {
  return set(produce((draft) => {
    draft.activeSong.isPlay = newValue;
  }));
};

const useActiveSongStore = create((set, get) => {
  return {
    activeSong: initialActiveSong,
    updateActiveSong: (newValue) => updateActiveSong(set, newValue),
    updateAutoplay: (newValue) => updateAutoplay(set, newValue),
    updateIsPlay: (newValue) => updateIsPlay(set, newValue),
  };
});

export default useActiveSongStore;
