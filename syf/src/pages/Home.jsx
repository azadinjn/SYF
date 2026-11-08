
import { Link } from "react-router";

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section>
        <div>
          <span>Simple • Fast • Secure</span>

          <h1>
            Share Files.
            <br />
            Simply.
          </h1>

          <p>
            Transfer files between devices quickly and easily.
            No account required. Just upload, share, and download.
          </p>

          <div>
            <Link to="/upload">
              Start Sharing
            </Link>

            <Link to="/code">
              Receive Files
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section>
        <div>
          <h2>Why Choose SYF?</h2>

          <p>
            Everything you need to share files easily and securely.
          </p>
        </div>

        <div>
          <article>
            <h3>Fast Transfer</h3>
            <p>
              Share your files quickly without complicated steps.
            </p>
          </article>

          <article>
            <h3>Secure & Private</h3>
            <p>
              Your files are shared through unique codes without requiring an account.
            </p>
          </article>

          <article>
            <h3>No Registration</h3>
            <p>
              Start sharing immediately. No account or sign-up required.
            </p>
          </article>

          <article>
            <h3>Multiple Files</h3>
            <p>
              Upload and share multiple files together in one package.
            </p>
          </article>

          <article>
            <h3>Easy Access</h3>
            <p>
              Receive files using a simple sharing code.
            </p>
          </article>

          <article>
            <h3>Automatic Expiration</h3>
            <p>
              Shared files are available for a limited time.
            </p>
          </article>
        </div>
      </section>
        
      {/* How It Works Section */}
      <section>
        <div>
          <h2>How It Works</h2>

          <p>
            Share your files in just three simple steps.
          </p>
        </div>

        <div>
          <article>
            <span>01</span>
            <h3>Upload Your Files</h3>
            <p>
              Select one or multiple files from your device.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Get Your Share Code</h3>
            <p>
              Once your files are uploaded, you'll receive a unique sharing code.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Share & Download</h3>
            <p>
              Send the code to anyone so they can access and download your files.
            </p>
          </article>
        </div>
      </section>
        
      {/* CTA Section */}
      <section>
        <div>
          <h2>Ready to Share Your Files?</h2>

          <p>
            Start sharing your files today. No account required.
          </p>

          <Link to="/upload">
            Start Sharing Now
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Home;
