const OPEN5E_URL = 'https://api.open5e.com/v1/';

const getSpells = async ( levelQuery, classQuery, schoolQuery ) => {
  let pageCounter = 1;
  let foundSpells = [];
  let next;

  do {
    let queryString = `spells?spell_level=${levelQuery}&school__iexact=${schoolQuery}&document__slug=wotc-srd&page=${pageCounter}`;

    const response = await fetch(`${OPEN5E_URL}${queryString}`);
    const data = await response.json();

    data.results.forEach((spell) => {
      if (spell.dnd_class.includes(classQuery)) {
        foundSpells.push({
          name: spell.name,
          level: spell.level,
          school: spell.school,
          slug: spell.slug,
        });
      }
    });

    next = data.next;
    pageCounter += 1;
  } while (next);

  return foundSpells;
}

const apiService = {
  getSpells,
}

export default apiService;
