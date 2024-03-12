const OPEN5E_URL = 'https://api.open5e.com/v1/';

const getSpells = async (levelQuery, classQuery, schoolQuery, pageNumber) => {
  let spellData = {
    count: 0,
    spells: [],
  };

  let queryString = `spells?spell_level=${levelQuery}&dnd_class__icontains=${classQuery}&school__iexact=${schoolQuery}&document__slug=wotc-srd&page=${pageNumber}`;

  const response = await fetch(`${OPEN5E_URL}${queryString}`);
  const data = await response.json();

  spellData.count = data.count;
  data.results.forEach((spell) => {
    spellData.spells.push({
      name: spell.name,
      level: spell.level,
      school: spell.school,
      slug: spell.slug,
    });
  });

  return spellData;
}

const getSpell = async (spellSlug) => {
  let queryString = `spells?slug=${spellSlug}&document__slug=wotc-srd`;

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
