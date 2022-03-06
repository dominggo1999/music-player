const { ipcRenderer, contextBridge } = require('electron');

const path = require('path');

const validChannels = ['get-files', 'select-dir', 'first-render', 'scanning-folder'];

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
  send: async (channel, data) => {
    if (validChannels.includes(channel)) {
      const response = await ipcRenderer.invoke(channel, data);
      return response;
    }
  },
};

contextBridge.exposeInMainWorld('api', api);