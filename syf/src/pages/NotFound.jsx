
import { Link } from "react-router";

function NotFound() {
  return (
    <main>
      <section>
        <p>404</p>

        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you are looking for doesn't exist
          or may have been moved.
        </p>

        <div>
          <Link to="/">
            Back to Home
          </Link>

          <Link to="/upload">
            Start Sharing
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
