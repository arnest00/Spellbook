import Link from "next/link";

const SpellTableRow = ({ name, level, school, slug }) => {
  return (
    <tr className="cmp-spell-table-row">
      <td className="cmp-spell-table-row__cell">{name}</td>
      <td className="cmp-spell-table-row__cell">{level}</td>
      <td className="cmp-spell-table-row__cell">{school}</td>
      <td className="cmp-spell-table-row__cell">
        <Link href={`/search/${slug}`}>
          View {name}
        </Link>
      </td>
    </tr>
  );
}

export default SpellTableRow;
