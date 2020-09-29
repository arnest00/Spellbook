const updateBtn = document.querySelector('#update-button');
const deleteBtn = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');

updateBtn.addEventListener('click', e => {
  fetch('/spells', {
    method: 'put',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: 'Magic Missile',
      desc: 'pew pew pew'
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(response => {
      window.location.reload(true);
    })
    .catch(error => console.error(error));
});

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