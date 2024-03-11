import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="cmp-navbar">
      <div>
        <Link href="/" className="cmp-navbar__logo">
          mageHand
        </Link>
      </div>

      <div>
        <ul>
          <li>
            <Link href="/search" className="cmp-navbar__item">
              Search for a Spell
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
