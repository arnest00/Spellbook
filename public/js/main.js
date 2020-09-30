const deleteBtn = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');

deleteBtn.addEventListener('click', e => {
  fetch('/spells', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: 'Magic Missile'
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(response => {
      if (response === 'No spell to delete') {
        messageDiv.textContent = 'No spell to delete.'
      } else {
        window.location.reload(true);
      };
    })
    .catch(error => console.error(error));
})