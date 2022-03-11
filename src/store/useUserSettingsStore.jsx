import create from 'zustand';
import produce from 'immer';

const initialSettings = {};
const saveSettings = async (settings) => {
  window.api.send('save-user-settings', settings);
};

const changeSettings = (set, get, key, value) => {
  return set(produce((draft) => {
    draft.settings[key] = value;
    saveSettings({
      ...get().settings,
      [key]: value,
    });
  }));
};

const settingsReceived = (set, settings) => {
  return set(produce((draft) => {
    draft.settings = settings;
  }));
};

const useUserSettingsStore = create((set, get) => {
  return {
    settings: initialSettings,
    changeSettings: (key, value) => changeSettings(set, get, key, value),
    settingsReceived: (settings) => settingsReceived(set, settings),
  };
});

export const userSettingsSelector = (key, settingsProperty) => {
  if(settingsProperty) {
    return useUserSettingsStore((state) => state.settings[settingsProperty]);
  }

  return useUserSettingsStore((state) => state[key]);
};

export default useUserSettingsStore;
