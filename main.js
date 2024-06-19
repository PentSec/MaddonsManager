const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const unzipper = require('unzipper');
const axios = require('axios');

let mainWindow;
const configFilePath = path.join(app.getPath('userData'), 'config.json');
const addonsStatusFile = path.join(app.getPath('userData'), 'addonsStatus.json');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    minHeight: 300,
    minWidth: 300,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: false,
      sandbox: true,
    }
  });
  if (!fs.existsSync(configFilePath)) {
    mainWindow.loadFile('config.html');
  } else {
    mainWindow.loadFile('index.html');
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.on('show-alert', (event, message) => {
  mainWindow.webContents.send('show-modal', message);
});

ipcMain.on('close-alert', () => {
  mainWindow.webContents.send('close-modal');
});


ipcMain.handle('open-file-dialog', async () => {
  try {
      const result = await dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [{ name: 'Executable', extensions: ['exe'] }],
      });

      if (result.canceled) {
          return null;
      } else {
          const wowPath = result.filePaths[0];

          // Verificar si el archivo seleccionado es wow.exe
          if (path.basename(wowPath).toLowerCase() !== 'wow.exe') {
              throw new Error('The selected file is not wow.exe');
          }

          const wowDir = path.dirname(wowPath);

          // Verificar si el directorio contiene las carpetas Interface y WTF
          const interfaceDir = path.join(wowDir, 'Interface');
          const wtfDir = path.join(wowDir, 'WTF');

          if (!fs.existsSync(interfaceDir) || !fs.existsSync(wtfDir)) {
              throw new Error('The selected directory does not contain the Interface and WTF folders.');
          }

          const config = { wowPath: wowDir };
          fs.writeFileSync(configFilePath, JSON.stringify(config), 'utf-8');
          return wowDir;
      }
  } catch (error) {
      mainWindow.webContents.send('show-modal', 'Error when selecting the WoW path:', error);
      throw error;
  }
});

ipcMain.handle('install-addon', async (event, githubUrl, addonName) => {
  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
    const wowDir = config.wowPath;
    const tempAddonDir = path.join(wowDir, 'Interface', 'Addons', `${addonName}-temp`);
    const finalAddonDir = path.join(wowDir, 'Interface', 'Addons', addonName);

    const branches = ['main', 'master'];
    let downloadUrl = '';
    let zipFilePath = path.join(wowDir, 'temp.zip');
    let success = false;

    for (const branch of branches) {
      try {
        downloadUrl = `${githubUrl}/archive/refs/heads/${branch}.zip`;
        const response = await axios({
          url: downloadUrl,
          method: 'GET',
          responseType: 'stream',
        });

        const writer = fs.createWriteStream(zipFilePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });

        success = true;
        break; // Exit the loop if the download is successful
      } catch (error) {
        console.log(`Branch ${branch} not found. Trying next branch.`);
      }
    }

    if (!success) {
      throw new Error('Neither main nor master branches are available.');
    }

    await extractZip(zipFilePath, tempAddonDir);
    console.log(`Addon ${addonName} downloaded and unzipped.`);

    await renameAddonFolder(tempAddonDir, addonName, finalAddonDir);

    fs.unlinkSync(zipFilePath);

    // Check if finalAddonDir contains a .toc file
    const filesInAddonDir = fs.readdirSync(finalAddonDir);
    const tocFile = filesInAddonDir.find(file => path.extname(file).toLowerCase() === '.toc');

    if (!tocFile) {
      // Move only folders from addonName to Interface/Addons
      const itemsToMove = fs.readdirSync(finalAddonDir);
      itemsToMove.forEach(item => {
        const srcPath = path.join(finalAddonDir, item);
        const destPath = path.join(wowDir, 'Interface', 'Addons', item);
        if (fs.statSync(srcPath).isDirectory()) {
          fs.renameSync(srcPath, destPath);
        }
      });
      // Remove finalAddonDir since it's empty now
      await fs.promises.rm(finalAddonDir, { recursive: true });
      return `Addon '${addonName}' installed correctly (move the folders to the main directory).`;
    }

    return `Addon '${addonName}' installed correctly.`;
  } catch (error) {
    mainWindow.webContents.send('show-modal', `Error installing the addon ⚠️<b>${addonName}</b> <br><br>${error.message}`);
    throw error;
  }
});

async function renameAddonFolder(tempAddonDir, addonName, finalAddonDir) {
  const files = await fs.promises.readdir(tempAddonDir);
  const addonFolder = files.find(file => 
    file.startsWith(addonName) && 
    (file.endsWith('-main') || file.endsWith('-master'))
  );

  if (!addonFolder) {
    throw new Error('The addon folder was not found after unzipping.');
  }

  const tempAddonFolderPath = path.join(tempAddonDir, addonFolder);
  await fs.promises.rename(tempAddonFolderPath, finalAddonDir);
  await fs.promises.rm(tempAddonDir, { recursive: true });
}

ipcMain.handle("uninstall-addon", async (event, addonName) => {
  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
    const wowDir = config.wowPath;
    const addonsDir = path.join(wowDir, "Interface", "Addons");

    const directories = fs
      .readdirSync(addonsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

      const matchingFolders = directories.filter((dir) => {
      const keywords = addonName.toLowerCase().split(/[_-]/);
      return keywords.some(keyword => dir.toLowerCase().includes(keyword)); 
      });

    if (matchingFolders.length === 0) {
      throw new Error(`No addon folders with '${addonName}' found.`);
    }

    for (const folder of matchingFolders) {
      const addonPath = path.join(addonsDir, folder);
      await removeFolder(addonPath);
      console.log(`Addon ${folder} deleted.`);
    }

    return `Addon(s) starting with '${addonName}' deleted.`;
  } catch (error) {
    mainWindow.webContents.send('show-modal', `Error when uninstalling addon ${addonName}: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('check-addon-exists', async (event, addonName) => {
  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
    const wowDir = config.wowPath;
    const addonPath = path.join(wowDir, 'Interface', 'Addons', addonName);
    return fs.existsSync(addonPath);
  } catch (error) {
    console.error(`Error checking if addon exists: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('read-addons-status', async () => {
  try {
    if (fs.existsSync(addonsStatusFile)) {
      const data = fs.readFileSync(addonsStatusFile, 'utf-8');
      return data;
    } else {
      return JSON.stringify([]);
    }
  } catch (error) {
    console.error('Error reading addons status:', error);
    throw error;
  }
});

ipcMain.handle('write-addons-status', async (event, data) => {
  try {
    fs.writeFileSync(addonsStatusFile, data, 'utf-8');
  } catch (error) {
    console.error('Error writing addons status:', error);
    throw error;
  }
});

async function extractZip(zipFilePath, extractPath) {
  return new Promise((resolve, reject) => {
    const zipFile = fs.createReadStream(zipFilePath);
    zipFile.pipe(unzipper.Extract({ path: extractPath }))
      .on('close', () => resolve())
      .on('error', (error) => reject(new Error(`Error decompressing the ZIP file: ${error.message}`)));
  });
}

async function removeFolder(folderPath) {
  await fsp.rm(folderPath, { recursive: true, force: true });
}