
import { Link } from "react-router";

function Footer() {
  return (
    <footer>
      <div>
        {/* Brand */}
        <div>
          <Link to="/">
            <img src="/logo.png" alt="SYF Logo" />
          </Link>

          <p>
            A simple and secure way to share files
            between devices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>

          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3>Legal</h3>

          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

       
         {/* Social Links */}
        <div>
          <h3>Follow Us</h3>
        
          <div>
            <a
              href="https://github.com/azadinjn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img
                src="/github.svg"
                alt="GitHub"
              />
            </a>
        
            <a
              href="https://www.linkedin.com/in/azeddine-jannane-a709243a0/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src="/linkedin.svg"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>

      <div>
        <p>
          © {new Date().getFullYear()} SYF. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
