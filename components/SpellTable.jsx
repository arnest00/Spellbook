import SpellTableRow from './SpellTableRow';

const SpellTable = ({ spells }) => {
  return (
    <table className="cmp-spell-table">
      <thead className="cmp-spell-table__head">
        <tr>
          <th className="cmp-spell-table__header">Name</th>
          <th className="cmp-spell-table__header">Level</th>
          <th className="cmp-spell-table__header">School</th>
          <th className="cmp-spell-table__header">Link to Spell Page</th>
        </tr>
      </thead>
      <tbody className="cmp-spell-table__body">
        {spells.map((spell) => (
          <SpellTableRow key={spell.slug} {...spell} />
        ))}
      </tbody>
    </table>
  );
}

export default SpellTable;
