const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getPackageInfo: () => ipcRenderer.invoke('get-package-info'),
  installAddon: async (githubUrl, addonName) => {
    try {
        const result = await ipcRenderer.invoke('install-addon', githubUrl, addonName);
        console.log(result);
    } catch (error) {
        ipcRenderer.send('show-alert', `Error installing ❌<b>${addonName}</b>❌ Press Uninstall first: <br><br>${error.message}`, 'modalError');
    }
  },
  uninstallAddon: async (addonName) => {
    try {
      const result = await ipcRenderer.invoke('uninstall-addon', addonName);
      console.log(result);
    } catch (error) {
      ipcRenderer.send('show-alert', `Error uninstall ❌<b>${addonName}</b>❌ <br><br>${error.message}`, 'modalError');
    }
  },
  updateAddon: async (githubUrl, addonName) => {
    try {
      const baseAddonName = addonName.split(/[_-]/)[0];
      const addonExists = await ipcRenderer.invoke('check-addon-exists', baseAddonName);
      if (!addonExists) {
        ipcRenderer.send('show-alert', `Addon ❌<b>${addonName}</b>❌: it is not in your folder. You must install it.`, 'modal');
        return;
      }
      await ipcRenderer.invoke('uninstall-addon', baseAddonName);
      await ipcRenderer.invoke('install-addon', githubUrl, addonName);
      ipcRenderer.send('show-alert', `Addon ✅<b>${addonName}</b>: updated correctly..`, 'modalSuccess');
    } catch (error) {
      ipcRenderer.send('show-alert', `ERROR when updating addon ❌<b>${addonName}</b>:❌ <b><b>${error.message}`, 'modalError');
    }
  },
  readAddonsStatus: async () => {
    try {
      const data = await ipcRenderer.invoke('read-addons-status');
      return data;
    } catch (error) {
      console.error(`Error reading addons status: ${error.message}`);
    }
  },
  writeAddonsStatus: async (data) => {
    try {
      await ipcRenderer.invoke('write-addons-status', data);
    } catch (error) {
      console.error(`Error writing addons status: ${error.message}`);
    }
  },
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  showAlert: (addonName) => ipcRenderer.send('show-alert', addonName),
  invoke: async (channel, ...args) => {
    return await ipcRenderer.invoke(channel, ...args);
  },
  receive: (channel, callback) => ipcRenderer.on(channel, callback),
    closeModal: () => ipcRenderer.send('close-alert')
  });