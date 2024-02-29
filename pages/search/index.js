import Button from '@/components/Button';
import Layout from '@/components/Layout';
import SelectInput from '@/components/SelectInput';

const SPELL_LEVEL_SELECT = {
  labelText: 'Filter by Level:',
  queryValue: 'spell-levels',
  inputName: 'level',
  options: [
    { value: '', name: 'All Levels' },
    { value: 'Cantrip', name: 'Cantrip' },
    { value: '1st-level', name: '1' },
    { value: '2nd-level', name: '2' },
    { value: '3rd-level', name: '3' },
    { value: '4th-level', name: '4' },
    { value: '5th-level', name: '5' },
    { value: '6th-level', name: '6' },
    { value: '7th-level', name: '7' },
    { value: '8th-level', name: '8' },
    { value: '9th-level', name: '9' },
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

const SearchPage = () => {
  return (
    <Layout>
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
    </Layout>
  );
}

export default SearchPage;
