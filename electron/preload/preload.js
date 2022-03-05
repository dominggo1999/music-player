const { ipcRenderer, contextBridge } = require('electron');

const path = require('path');

const validChannels = ['get-files'];

const api = {
  receive: (channel, callback) => {
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      const subscription = (event, ...args) => callback(...args);
      ipcRenderer.on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    }
  },
};

contextBridge.exposeInMainWorld('api', api);
