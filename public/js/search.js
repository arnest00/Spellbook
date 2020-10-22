const selectMenus = document.querySelectorAll('.form-group select');

selectMenus.forEach(select => {
  select.addEventListener('change', e => {
    console.log('Changed!');
  });
});