import Head from 'next/head';
import Button from '@/components/Button';
import Layout from '@/components/Layout';
import SelectInput from '@/components/SelectInput';
import SpellTable from '@/components/SpellTable';
import apiService from '@/services/apiService';

const SPELL_LEVEL_SELECT = {
  labelText: 'Filter by Level:',
  queryValue: 'spell-levels',
  inputName: 'level',
  options: [
    { value: '', name: 'All Levels' },
    { value: '0', name: 'Cantrip' },
    { value: '1', name: '1st-level' },
    { value: '2', name: '2nd-level' },
    { value: '3', name: '3rd-level' },
    { value: '4', name: '4th-level' },
    { value: '5', name: '5th-level' },
    { value: '6', name: '6th-level' },
    { value: '7', name: '7th-level' },
    { value: '8', name: '8th-level' },
    { value: '9', name: '9th-level' },
  ],
};
const SPELL_CLASS_SELECT = {
  labelText: 'Filter by Class:',
  queryValue: 'spell-classes',
  inputName: 'class',
  options: [
    { value: '', name: 'All Classes' },
    { value: 'Bard', name: 'Bard' },
    { value: 'Cleric', name: 'Cleric' },
    { value: 'Druid', name: 'Druid' },
    { value: 'Paladin', name: 'Paladin' },
    { value: 'Ranger', name: 'Ranger' },
    { value: 'Sorcerer', name: 'Sorcerer' },
    { value: 'Warlock', name: 'Warlock' },
    { value: 'Wizard', name: 'Wizard' },
  ],
};
const SPELL_SCHOOL_SELECT = {
  labelText: 'Filter by School:',
  queryValue: 'spell-schools',
  inputName: 'school',
  options: [
    { value: '', name: 'All Schools' },
    { value: 'Abjuration', name: 'Abjuration' },
    { value: 'Conjuration', name: 'Conjuration' },
    { value: 'Divination', name: 'Divination' },
    { value: 'Enchantment', name: 'Enchantment' },
    { value: 'Evocation', name: 'Evocation' },
    { value: 'Illusion', name: 'Illusion' },
    { value: 'Necromancy', name: 'Necromancy' },
    { value: 'Transmutation', name: 'Transmutation' },
  ],
};

const SearchPage = ({ spells, message }) => {
  return (
    <Layout>
      <Head>
        <title>My Spellbook - Search for a Spell</title>
      </Head>
      <section>
        <h1 className="util-align-center">Search for a Spell</h1>
        <form>
          <SelectInput {...SPELL_LEVEL_SELECT} />
          <SelectInput {...SPELL_CLASS_SELECT} />
          <SelectInput {...SPELL_SCHOOL_SELECT} />
          <div>
            <Button type="submit" buttonText="Search" />
          </div>
        </form>
      </section>
      <section>
        <h2>Found Spells</h2>
        {spells.length
        ? (
          <>
            <p>{spells.length} spells found.</p>
            <SpellTable spells={spells} />
          </>
        ) : <p>{message}</p>}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let spells = [];
  let message = 'Search for spells using the form above.';

  if (Object.keys(context.query).length !== 0) {
    const { query } = context;
    const levelQuery = query.level || '';
    const classQuery = query.class || '';
    const schoolQuery = query.school || '';

    spells = await apiService.getSpells(levelQuery, classQuery, schoolQuery);

    if (!spells.length) message = 'No spells match your query. Try another search.';
  };

  return {
    props: {
      spells,
      message,
    },
  };
}

export default SearchPage;
