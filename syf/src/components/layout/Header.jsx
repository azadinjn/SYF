import { Link, NavLink } from "react-router";

function Header() {
  const linkStyle = ({ isActive }) =>
    `rounded-lg px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/upload" className="flex items-center">
          <img
            src="/logo.png"
            alt="SYF Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <NavLink to="/upload" className={linkStyle}>
            Upload
          </NavLink>

          <NavLink to="/code" className={linkStyle}>
            Code
          </NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Header;
