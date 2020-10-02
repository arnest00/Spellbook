const spellCardNameContainers = document.querySelectorAll('.spell-card-name-container');
const spellCardArrows = document.querySelectorAll('.spell-card-name-container span');
const spellCardInfoContainers = document.querySelectorAll('.spell-card-info-container');

for (let i = 0; i < spellCardNameContainers.length; i++) {
  spellCardNameContainers[i].addEventListener('click', e => {
    if (spellCardArrows[i].classList.contains('spell-card-hidden')) {
      spellCardArrows[i].innerHTML = '&#x25B2;';
      spellCardArrows[i].classList.toggle('spell-card-hidden');
    } else {
      spellCardArrows[i].innerHTML = '&#x25BC;';
      spellCardArrows[i].classList.toggle('spell-card-hidden');
    };

    spellCardInfoContainers[i].classList.toggle('hidden');
  });
};