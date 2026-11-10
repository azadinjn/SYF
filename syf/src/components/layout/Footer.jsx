
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="mt-20 border-t border-marina-100 bg-marina-50/50">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

        {/* Brand */}
        <div className="flex flex-col items-start">
          <Link to="/" className="mb-4">
            <img
              src="/logo.png"
              alt="SYF Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <p className="max-w-xs text-sm leading-7 text-slate-600">
            A simple and secure way to share files
            between devices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-base font-extrabold text-marina-700">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link to="/about" className="text-sm font-semibold text-slate-600 transition hover:text-marina-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-sm font-semibold text-slate-600 transition hover:text-marina-500">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm font-semibold text-slate-600 transition hover:text-marina-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="mb-5 text-base font-extrabold text-marina-700">
            Legal
          </h3>

          <ul className="space-y-3">
            <li>
              <Link to="/privacy" className="text-sm font-semibold text-slate-600 transition hover:text-marina-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm font-semibold text-slate-600 transition hover:text-marina-500">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="mb-5 text-base font-extrabold text-marina-700">
            Follow Us
          </h3>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/azadinjn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-marina-100 bg-white transition hover:-translate-y-1 hover:border-marina-300 hover:bg-marina-100"
            >
              <img
                src="/github.svg"
                alt="GitHub"
                className="h-5 w-5 object-contain"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/azeddine-jannane-a709243a0/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-marina-100 bg-white transition hover:-translate-y-1 hover:border-marina-300 hover:bg-marina-100"
            >
              <img
                src="/linkedin.svg"
                alt="LinkedIn"
                className="h-5 w-5 object-contain"
              />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-marina-100">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="text-center text-xs font-semibold text-slate-500">
            © {new Date().getFullYear()} SYF. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
