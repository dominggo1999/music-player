import create from 'zustand';
import produce from 'immer';

export const initialActiveSong = {
  isPlay: false,
  info: {
    cover: '',
    duration: '',
    artist: '',
    title: '',
  },
};

const updateInfo = (set, newValue) => {
  return set(produce((draft) => {
    draft.info = newValue;
  }));
};

const useActiveSong = create((set, get) => {
  return {
    activeSong: initialActiveSong,
    updateInfo: (newValue) => updateInfo(set, newValue),
  };
});

export default useActiveSong;
