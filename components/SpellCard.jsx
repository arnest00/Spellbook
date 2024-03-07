const SpellCard = ({ spell }) => {
  const spellCategory = spell.level === 'cantrip'
    ? `${spell.school} cantrip`
    :`${spell.level}-level ${spell.school}`;
  const spellComponents = spell.components.join(', ').toUpperCase();
  const spellMaterial = spell.material ? ` (${spell.material})` : '';
  const spellDuration = spell.concentration === 'on'
    ? `Concentration, ${spell.duration}`
    : `${spell.duration}`;

  return (
    <section className="cmp-spell-card">
      <h1>{spell.name}</h1>
      <p className="cmp-spell-card__category">
        {spellCategory}
      </p>
      <p>
        <span className="cmp-spell-card__label">Casting Time:</span> {spell.time}
      </p>
      <p>
      <span className="cmp-spell-card__label">Range:</span> {spell.range}
      </p>
      <p>
      <span className="cmp-spell-card__label">Components:</span> {spellComponents}{spellMaterial}
      </p>
      <p>
      <span className="cmp-spell-card__label">Duration:</span> {spellDuration}
      </p>
      {spell.desc.map((descParagraph, idx) => (
        <p key={`desc-${idx}`}>
          {descParagraph}
        </p>
      ))}
      {spell.higherLevel && (
        <p>
        <span className="cmp-spell-card__label">At Higher Levels.</span> {spell.higherLevel}
        </p>
      )}
    </section>
  )
}

export default SpellCard;
