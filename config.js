document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('select-wow-path').addEventListener('click', async (event) => {
      try {
          // Prevent default action if any (e.g., submitting a form)
          event.preventDefault();
          event.stopPropagation();

          const wowDir = await window.electronAPI.invoke('open-file-dialog');
          if (wowDir) {
              alert(`Selected WoW path: ${wowDir}`);
              window.location.href = 'index.html';
          } else {
            alert('You must select a valid route.');
          }
      } catch (error) {
          console.error('Error when selecting the WoW path:', error.message);
          alert('Error when selecting the WoW path. Check the selection.');
      }
  });
});