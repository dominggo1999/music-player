import create from 'zustand';
import produce from 'immer';

import React from 'react';

export const initialTheme = {
  name: 'originale',
};

const changeTheme = (set, newTheme) => {
  return set(produce((draft) => {
    draft.theme.name = newTheme;
  }));
};

const useThemeStore = create((set, get) => {
  return {
    theme: initialTheme,
    changeTheme: (newTheme) => changeTheme(set, newTheme),
  };
});

export default useThemeStore;
