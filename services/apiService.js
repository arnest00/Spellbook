const OPEN5E_URL = 'https://api.open5e.com/v1/';

const getSpells = async (levelQuery, classQuery, schoolQuery) => {
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

const getSpell = async (spellSlug) => {
  let queryString = `spells?slug=${spellSlug}`;

  const response = await fetch(`${OPEN5E_URL}${queryString}`);
  const data = await response.json();
  const foundSpell = data.results[0];

  return {
    name: foundSpell.name,
    level: foundSpell.level === 'Cantrip' ? 'cantrip' : foundSpell.level.slice(0,3),
    higherLevel: foundSpell.higher_level,
    desc: foundSpell.desc.split('\n\n'),
    range: foundSpell.range,
    components: foundSpell.components.toLowerCase().split(', '),
    material: foundSpell.material.toLowerCase().slice(0,-1),
    concentration: foundSpell.concentration === 'yes' ? 'on' : null,
    duration: foundSpell.duration === 'Instantaneous' ? foundSpell.duration : foundSpell.duration.toLowerCase(),
    concentration: foundSpell.concentration,
    time: foundSpell.casting_time,
    school: foundSpell.school.toLowerCase(),
    slug: foundSpell.slug
  };
}

const apiService = {
  getSpells,
  getSpell
}

export default apiService;
