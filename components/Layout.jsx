import Navbar from './Navbar';

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <main className="obj-layout">
        {children}
      </main>
    </>
  );
}

export default Layout;
