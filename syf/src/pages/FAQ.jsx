
function FAQ() {
  return (
    <main>
      {/* Hero Section */}
      <section>
        <h1>Frequently Asked Questions</h1>

        <p>
          Find answers to common questions about using SYF
          and sharing your files.
        </p>
      </section>
      
      {/* General Questions */}
      <section>
        <h2>General Questions</h2>

        <article>
          <h3>What is SYF?</h3>
          <p>
            SYF is a file-sharing platform that allows users
            to transfer files between devices using a unique code.
          </p>
        </article>

        <article>
          <h3>Is SYF free to use?</h3>
          <p>
            Yes, SYF is free to use. You can upload and share
            files without creating an account.
          </p>
        </article>

        <article>
          <h3>Do I need to create an account?</h3>
          <p>
            No. You can use SYF without registration or login.
          </p>
        </article>

        <article>
          <h3>Can I use SYF on different devices?</h3>
          <p>
            Yes. You can upload files from one device and
            download them from another device using the sharing code.
          </p>
        </article>
      </section>
        
      {/* Uploading Files */}
      <section>
        <h2>Uploading Files</h2>

        <article>
          <h3>How can I upload files?</h3>
          <p>
            Go to the Upload page, select your files or drag
            and drop them into the upload area, then click
            the Upload button.
          </p>
        </article>

        <article>
          <h3>What file types are supported?</h3>
          <p>
            SYF supports common file formats, including PDF,
            documents, spreadsheets, presentations, images,
            text files, CSV, and ZIP archives.
          </p>
        </article>

        <article>
          <h3>What is the maximum upload size?</h3>
          <p>
            The maximum total upload size is 10 MB per package.
          </p>
        </article>

        <article>
          <h3>Can I upload multiple files at once?</h3>
          <p>
            Yes. You can upload multiple files together
            in a single package.
          </p>
        </article>

        <article>
          <h3>Can I set a password for my files?</h3>
          <p>
            Yes. You can optionally protect your package
            with a password during the upload process.
          </p>
        </article>
      </section>
        
      {/* Sharing Codes */}
      <section>
        <h2>Sharing Codes</h2>

        <article>
          <h3>What is a sharing code?</h3>
          <p>
            A sharing code is a unique code generated after
            uploading your files. It allows others to access
            your file package.
          </p>
        </article>

        <article>
          <h3>Where can I find my sharing code?</h3>
          <p>
            Your sharing code is displayed after a successful
            upload on the package details page.
          </p>
        </article>

        <article>
          <h3>How can I receive files using a code?</h3>
          <p>
            Open the Code page, enter the sharing code,
            and follow the instructions to access the files.
          </p>
        </article>

        <article>
          <h3>How many characters does a sharing code have?</h3>
          <p>
            Each SYF sharing code contains 5 characters.
          </p>
        </article>
      </section>
        
      {/* Downloading Files */}
      <section>
        <h2>Downloading Files</h2>

        <article>
          <h3>How can I download shared files?</h3>
          <p>
            Enter the sharing code on the Code page.
            Once the package is found, you can access its files
            and download them.
          </p>
        </article>

        <article>
          <h3>Can I download a single file?</h3>
          <p>
            Yes. You can download individual files from a package.
          </p>
        </article>

        <article>
          <h3>Can I download all files together?</h3>
          <p>
            Yes. You can download the entire package as a ZIP archive.
          </p>
        </article>

        <article>
          <h3>What happens if a package expires?</h3>
          <p>
            Once a package expires, it is no longer available
            for downloading.
          </p>
        </article>

        <article>
          <h3>Why is my sharing code not working?</h3>
          <p>
            The package may have expired, the code may be incorrect,
            or the package may no longer be available.
          </p>
        </article>
      </section>
        
      {/* Security & Privacy */}
      <section>
        <h2>Security & Privacy</h2>

        <article>
          <h3>Are my files protected with a password?</h3>
          <p>
            You can optionally add a password to your package.
            Anyone accessing a protected package will need
            the password to continue.
          </p>
        </article>

        <article>
          <h3>How long are my files available?</h3>
          <p>
            You can choose an expiration period when creating
            a package. Available options range from 24 hours
            to 7 days.
          </p>
        </article>

        <article>
          <h3>Does SYF require personal information?</h3>
          <p>
            No account or registration is required to use
            the file-sharing service.
          </p>
        </article>

        <article>
          <h3>Should I share my code with everyone?</h3>
          <p>
            Only share your code with people you trust.
            If your package is password-protected, share
            the password securely as well.
          </p>
        </article>
      </section>

    </main>
  );
}

export default FAQ;
