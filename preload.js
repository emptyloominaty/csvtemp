const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('csvAPI', {
  getCSVFiles: () => {
    return ipcRenderer.invoke('get-csv-files')
  }
});