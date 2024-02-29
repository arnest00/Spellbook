import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({title = 'My Spellbook', children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className="obj-layout">
        {children}
      </main>
    </>
  );
}

export default Layout;
