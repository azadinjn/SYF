
import { useState } from "react";
import { Link, NavLink } from "react-router";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    `block rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
      isActive
        ? "bg-marina-50 text-marina-700 shadow-sm"
        : "text-slate-600 hover:bg-marina-50/70 hover:text-marina-700"
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
    <header className="sticky top-0 z-50 border-b border-marina-100/80 bg-white/90 shadow-[0_6px_24px_rgba(0,85,130,0.05)] backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

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
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-marina-100 bg-white text-marina-700 transition hover:bg-marina-50 md:hidden"
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="animate-fade-up border-t border-marina-100 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
