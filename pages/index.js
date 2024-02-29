import Head from 'next/head';
import Layout from '@/components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <Head>
        <title>My Spellbook</title>
      </Head>
      <section>
        <h1 className="util-align-center">Welcome!</h1>
        <p>
          Look up spells for the world&apos;s most popular role-playing game with this 5e-compatible web app.
        </p>
        <p>
          Searchable spells are limited to what can be found in the System Reference Document 5.1.
        </p>
      </section>
    </Layout>
  );
}

export default HomePage;
