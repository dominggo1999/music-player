import create from 'zustand';
import produce from 'immer';

export const initialActiveSong = {
  isPlay: false,
  path: '',
  nextPath: '',
  prevPath: '',
  isAutoplay: false,
};

const updateActiveSong = (set, newValue) => {
  return set(produce((draft) => {
    draft.activeSong.path = newValue;
  }));
};

const updateNextPath = (set, newValue) => {
  return set(produce((draft) => {
    draft.activeSong.nextPath = newValue;
  }));
};

const updatePrevPath = (set, newValue) => {
  return set(produce((draft) => {
    draft.activeSong.prevPath = newValue;
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

const resetActiveSong = (set) => {
  return set(produce((draft) => {
    draft.activeSong = initialActiveSong;
  }));
};

const useActiveSongStore = create((set, get) => {
  return {
    activeSong: initialActiveSong,
    updateActiveSong: (newValue) => updateActiveSong(set, newValue),
    updateAutoplay: (newValue) => updateAutoplay(set, newValue),
    updateIsPlay: (newValue) => updateIsPlay(set, newValue),
    updateNextPath: (newValue) => updateNextPath(set, newValue),
    updatePrevPath: (newValue) => updatePrevPath(set, newValue),
    resetActiveSong: () => resetActiveSong(set),
  };
});

export default useActiveSongStore;
