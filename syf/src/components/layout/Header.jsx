
import { useState } from "react";
import { Link, NavLink } from "react-router";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
      isActive
        ? "bg-marina-100 text-marina-700"
        : "text-slate-600 hover:bg-marina-50 hover:text-marina-700"
    }`;

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = (
    <>
      <NavLink to="/" end className={linkStyle} onClick={closeMenu}>
        Home
      </NavLink>

      <NavLink to="/upload" className={linkStyle} onClick={closeMenu}>
        Upload
      </NavLink>

      <NavLink to="/code" className={linkStyle} onClick={closeMenu}>
        Receive
      </NavLink>

      <NavLink to="/about" className={linkStyle} onClick={closeMenu}>
        About
      </NavLink>

      <NavLink to="/contact" className={linkStyle} onClick={closeMenu}>
        Contact
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-marina-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
       <Link to="/" className="flex shrink-0 items-center" onClick={closeMenu}>
        <img
          src="/logo.svg"
          alt="SYF Logo"
          className="h-7 w-auto object-contain"
        />
      </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-marina-100 bg-white text-black transition hover:bg-marina-50 md:hidden"
        >
          {isMenuOpen ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <span className="text-2xl leading-none">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="animate-fade-up border-t border-marina-100 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
