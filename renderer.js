const addonsContainer = document.getElementById("addons-container");
const refreshButton = document.getElementById("refresh-button");
const themeToggle = document.querySelector('.theme-controller');
const searchInput = document.getElementById('search-input');
const addonTypeFilter = document.getElementById('addonTypeFilter');

let installedAddons = [];
let addons = [];
let timeoutId;


document.addEventListener('DOMContentLoaded', async () => {
  await loadAddonsJson();
  await loadInstalledAddons();
  await loadAddons();
  await applyInitialTheme();

  if (searchInput) {
    searchInput.addEventListener('input', loadAddons);
  }
  if (addonTypeFilter) {
    addonTypeFilter.addEventListener('change', loadAddons);
  }
});

async function loadInstalledAddons() {
  try {
    const data = await window.electronAPI.readAddonsStatus();
    installedAddons = JSON.parse(data);
  } catch (error) {
    console.error(`Error reading installed addons: ${error.message}`);
  }
}

// https://raw.githubusercontent.com/PentSec/MasterAddonManager/main/addons.json
async function loadAddonsJson() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/PentSec/MasterAddonManager/main/addons.json');
    addons = await response.json();
  } catch (error) {
    console.error(`Error loading addons.json: ${error.message}`);
  }
}

let currentPage = 1;
const pageSize = 50;
// Upload addons to container.
async function loadAddons() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    const addonsContainer = document.getElementById('addons-container');
    if (!addonsContainer) {
      return;
    }
    addonsContainer.innerHTML = ""; 
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const addonType = addonTypeFilter ? addonTypeFilter.value : '';

    const table = document.createElement('div');
    table.classList.add('overflow-x-auto');
    table.innerHTML = `
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Addons</th>
            <th>Description</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="addonsTableBody">
        </tbody>
      </table>
      <div class="join grid grid-cols-2">
        <button id="prevPageBtn" class="join-item btn btn-outline btn-xs">Previous page</button>
        <button id="nextPageBtn" class="join-item btn btn-outline btn-xs">Next</button>
      </div>
    `;
    addonsContainer.appendChild(table);
    const addonsTableBody = document.getElementById('addonsTableBody');
    try {
      let filteredAddons = addons.filter(addon => addon.name.toLowerCase().includes(searchTerm));
      // AddonType Filter
      if (addonType === 'Installed') {
        filteredAddons = filteredAddons.filter(addon => installedAddons.includes(addon.name));
      } else if (addonType === 'NonInstalled') {
        filteredAddons = filteredAddons.filter(addon => !installedAddons.includes(addon.name));
      } else if (addonType) {
        filteredAddons = filteredAddons.filter(addon => addon.addonType === addonType);
      }

      const startIndex = (currentPage - 1) * pageSize;
      let endIndex = startIndex + pageSize;
      if (endIndex > filteredAddons.length) {
        endIndex = filteredAddons.length;
      }     
      for (let i = startIndex; i < endIndex; i++) {
        const addon = filteredAddons[i];
        const isInstalled = await checkAddonInstalled(addon.name);
        const addonRow = document.createElement("tr");
          addonRow.className = "hover";
          addonRow.innerHTML = `
            <th>
            <label>
            </label>
            </th>
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="${addon.imageUrl}" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div><div class="progress-bar-container hidden mt-2 space-y-2">
                <span class="loading loading-ring loading-lg text-success"></span></div>
                <div>${addon.Hot}
                  <div class="font-bold text-white"><a href="${addon.githubRepo}" target="_blank" rel="noopener noreferrer" class="font-bold text-white hover:underline">${addon.name}</a></div>
                  <div class="text-sm opacity-50 text-white">${addon.lastCommitDate}</div>
                </div>
              </div>
            </td>
            <td class="text-white">${addon.description}
              <br/>
              <span class="badge badge-ghost badge-sm">${addon.addonType}</span>
            </td>
            <td class="text-white">${addon.author}</td>
            <th>
            <div class="flex space-x-2">
              <button class="btn ${isInstalled ? 'btn-error' : 'btn-success'} btn-xs" onclick="toggleInstallStatus(this, '${addon.githubRepo}', '${addon.name}')">${isInstalled ? 'UNINSTALL' : 'INSTALL'}</button>
              <button class="btn btn-info btn-xs" onclick="updateAddon('${addon.githubRepo}', '${addon.name}')">UPDATE</button>
              </div>
            </th>
            </div>
          `;

        addonsTableBody.appendChild(addonRow);
      }

      // show button next page if exist another page
      const totalPages = Math.ceil(filteredAddons.length / pageSize);
      showPaginationButtons(totalPages);

    } catch (error) {
      console.error(`Error loading addons: ${error.message}`);
    }
  }, 300); // millisecond time wait to request again Disable atm
}
// page button
function showPaginationButtons(totalPages) {
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');

  if (currentPage > 1) {
    prevPageBtn.style.display = 'inline-block';
  } else {
    prevPageBtn.style.display = 'none';
  }

  if (currentPage < totalPages) {
    nextPageBtn.style.display = 'inline-block';
  } else {
    nextPageBtn.style.display = 'none';
  }

  // Event listeners to page button
  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      loadAddons();
    }
  });

  nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadAddons();
    }
  });
}
// Listen for changes in the search input and call loadAddons() when it changes
document.getElementById('search-input').addEventListener('input', loadAddons);

// check if addons if installed on addonsStatus.json
async function checkAddonInstalled(addonName) {
  try {
      const response = await window.electronAPI.readAddonsStatus();
      const installedAddons = response ? JSON.parse(response) : [];
      return installedAddons.includes(addonName);
  } catch (error) {
      console.error(`Error checking addon status: ${error.message}`);
      return false; // Devolver false si hay un error o el addon no está instalado
  }
}

// Change addon installation status (install/uninstall)
async function toggleInstallStatus(buttonElement, githubUrl, addonName) {
  const addonRow = buttonElement.closest('tr');
  const progressBarContainer = addonRow.querySelector('.progress-bar-container');
  const radialProgressBar = progressBarContainer.querySelector('.loading');
  // const progressMessage = progressBarContainer.querySelector('.progress-message');

  try {
    const isInstalled = await checkAddonInstalled(addonName);

    radialProgressBar.style.setProperty('--value', '0');
    // progressMessage.innerText = isInstalled ? 'Uninstalling...' : 'Installing...';
    progressBarContainer.style.display = 'block';

    const updateProgress = (value, message) => {
      radialProgressBar.style.setProperty('--value', value);
      radialProgressBar.innerText = `${value}%`;
      // progressMessage.innerText = message;
    };

    if (isInstalled) {
      // Desinstalar el addon
      await window.electronAPI.uninstallAddon(addonName);

      await updateAddonsStatus(addonName, false);
      buttonElement.innerText = 'INSTALL';
      buttonElement.classList.remove('btn-error');
      buttonElement.classList.add('btn-success');
    } else {
      // Instalar el addon
      const addonInfo = addons.find(addon => addon.name === addonName);
      if (!addonInfo) {
        throw new Error(`Addon '${addonName}' not found in addons.json`);
      }

      const { addonInfolder } = addonInfo;

      await window.electronAPI.installAddon(githubUrl, addonName, {
        onProgress: (percent) => {
          // updateProgress(percent, `Installing... ${percent}%`);
        },
        addonInfolder
      });

      updateProgress(100, 'Installed successfully.');
      // progressMessage.style.color = 'green';

      await updateAddonsStatus(addonName, true);
      buttonElement.innerText = 'UNINSTALL';
      buttonElement.classList.remove('btn-success');
      buttonElement.classList.add('btn-error');
    }

    // Ocultar la barra de progreso después de un tiempo
    setTimeout(() => {
      progressBarContainer.style.display = 'none';
    }, 2000);

  } catch (error) {
    console.error(`Error changing install status of addon '${addonName}': ${error.message}`);
    // progressMessage.innerText = `Error: ${error.message}`;
    // progressMessage.style.color = 'red';
    progressBarContainer.style.display = 'none';
  }
}

window.electronAPI.receive('show-modal', (event, message) => {
  document.getElementById('message').innerHTML = message;
  document.getElementById('modal').showModal();
});

window.electronAPI.receive('close-modal', () => {
  document.getElementById('modal').close();
});

document.getElementById('okButton').addEventListener('click', () => {
  window.electronAPI.closeModal();
});

window.electronAPI.receive('update-available', (info) => {
  document.getElementById('message').innerHTML = `Update available: Go to Github repo to see Changelogs.`;
  document.getElementById('modal').showModal();
});

window.electronAPI.receive('update-downloaded', (info) => {
  document.getElementById('message').innerHTML = `Update downloaded: The app will restart to apply the update.`;
  document.getElementById('modal').showModal();

  setTimeout(() => {
    window.electronAPI.send('restart-app');
  }, 5000); 
});

// Actualiza el estado de instalación del addon en la lista de addons instalados
async function updateAddonsStatus(addonName, isInstalled) {
  try {
    const response = await window.electronAPI.readAddonsStatus();
    let installedAddons = response ? JSON.parse(response) : [];

    if (isInstalled) {
      installedAddons.push(addonName);
    } else {
      installedAddons = installedAddons.filter(name => name !== addonName);
    }

    await window.electronAPI.writeAddonsStatus(JSON.stringify(installedAddons));
  } catch (error) {
    console.error(`Error updating addon status: ${error.message}`);
  }
}
// Minimize Button
document.getElementById('minimize-button').addEventListener('click', () => {
  window.electronAPI.send('minimize-window');
  console.log("minimizar");
});

// Maximize Button
document.getElementById('maximize-button').addEventListener('click', () => {
  window.electronAPI.send('maximize-window');
  console.log("maximizar");
});

// Close Button
document.getElementById('close-button').addEventListener('click', () => {
  window.electronAPI.send('close-window');
  console.log("cerrar");
});

window.updateAddon = async (githubUrl, addonName) => {
  try {
    await window.electronAPI.updateAddon(githubUrl, addonName);
  } catch (error) {
    console.error(`Error updating addon '${addonName}': ${error.message}`);
  }
};

themeToggle.addEventListener('change', () => {
  const addonsContainer = document.getElementById('addons-container');
  if (themeToggle.checked) {
    // Aplicar tema oscuro usando clases de DaisyUI
    addonsContainer.classList.remove('bg-white', 'text-black');
    addonsContainer.classList.add('bg-gray-800', 'text-white');
  } else {
    // Aplicar tema claro usando clases de DaisyUI
    addonsContainer.classList.remove('bg-gray-800', 'text-white');
    addonsContainer.classList.add('bg-white', 'text-black');
  }
});

// Función para aplicar el tema inicial basado en el estado inicial del toggle
const applyInitialTheme = () => {
  const addonsContainer = document.getElementById('addons-container');
  if (themeToggle.checked) {
    addonsContainer.classList.add('bg-gray-800', 'text-white');
  } else {
    addonsContainer.classList.add('bg-white', 'text-black');
  }
};