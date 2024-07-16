document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('select-wow-path').addEventListener('click', async (event) => {
      try {
          event.preventDefault();
          event.stopPropagation();

          const wowDir = await window.electronAPI.invoke('open-file-dialog');
          if (wowDir) {
              window.location.href = 'index.html';
          } else {
              showModal('❌    You need select the wow.exe the path must also contain the 📂Interface folder', 'modalError');
          }
      } catch (error) {
              showModal('❌    You need select the wow.exe the path must also contain the 📂Interface folder', 'modalError');
      }
  });
});

function showModal(message, type) {
  const modal = document.getElementById(type);
  const messageElement = document.getElementById(`${type}-message`);

  if (modal && messageElement) {
    messageElement.innerHTML = message;
    modal.showModal();
    modal.querySelector('.close-button').addEventListener('click', () => {
      modal.close();
    });
  } else {
    console.error(`Modal or message element for "${type}" not found.`);
  }
}