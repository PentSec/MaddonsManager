document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('select-wow-path').addEventListener('click', async (event) => {
      try {
          event.preventDefault();
          event.stopPropagation();

          const wowDir = await window.electronAPI.invoke('open-file-dialog');
          if (wowDir) {
              window.location.href = '../../index.html';
          } else {
              showModal('❌    You need select the wow.exe the path must also contain the 📂Interface folder', 'modalError');
          }
      } catch (error) {
              showModal('❌    You need select the wow.exe the path must also contain the 📂Interface folder', 'modalError');
      }
  });
});

const footerContainer = document.getElementById('OwnerLink');
  if (footerContainer) {
    const footerContent = `
      <div class="flex justify-end pr-4 pb-4">
        <p class="text-xs text-right">Developed by <a href="#" id="Owner-link" target="_blank" class="text-blue-500 hover:underline">Jeff</a></p>
      </div>
    `;
    footerContainer.innerHTML = footerContent;
    document.getElementById('Owner-link').addEventListener('click', (event) => {
      event.preventDefault();
      window.electronAPI.openExternalLink('https://github.com/PentSec');
    });
  }

  function showModal(message, type) {
    const modal = document.getElementById(type);
    const messageElement = document.getElementById(`${type}-message`);
  
    if (modal && messageElement) {
      messageElement.innerHTML = message;
      modal.showModal();
      const closeButton = modal.querySelector('.close-button');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          modal.close();
        });
      } else {
        console.error('Close button not found in the modal.');
      }
    } else {
      console.error(`Modal or message element for "${type}" not found.`);
    }
  }