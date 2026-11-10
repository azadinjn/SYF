
function About() {
  const values = [
    {
      title: "Simplicity",
      description:
        "We keep the file-sharing process simple and easy to use.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
          <path d="M12 3v18M3 12h18" />
        </svg>
      ),
    },
    {
      title: "Accessibility",
      description:
        "Anyone can share files without creating an account.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      ),
    },
    {
      title: "Privacy",
      description:
        "We aim to provide a private sharing experience with no unnecessary registration.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      ),
    },
    {
      title: "Reliability",
      description:
        "We focus on providing a straightforward and dependable file-sharing experience.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
          <path d="m5 12 4 4L19 6" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
  ];

  const benefits = [
    "No account or registration required.",
    "Share multiple files in one package.",
    "Access files using a unique sharing code.",
    "Download individual files or the entire package.",
    "Share files across different devices.",
  ];

  return (
    <main className="min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-b from-marina-50/40 via-white to-white">

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16 lg:gap-20">

        {/* Hero Section */}
        <section className="animate-fade-up mx-auto max-w-3xl space-y-5 text-center">
          

          <h1 className="text-4xl font-extrabold tracking-tight text-marina-700 sm:text-5xl">
            About SYF
          </h1>

          <p className="text-lg font-semibold leading-8 text-marina-500 sm:text-xl">
            Making file sharing simple, fast, and accessible to everyone.
          </p>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-slate-500 sm:text-base">
            SYF is a simple file-sharing platform that allows users
            to transfer files between devices using a unique sharing
            code. No account or registration required.
          </p>

          
        </section>

        {/* Our Mission Section */}
        <section className="animate-fade-up grid items-center gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <span className="text-sm font-bold uppercase tracking-wider text-marina-500">
              What Drives Us
            </span>

            <h2 className="text-3xl font-extrabold text-marina-700">
              Our Mission
            </h2>

            <p className="text-sm leading-8 text-slate-500 sm:text-base">
              Our mission is to make file sharing easier for everyone.
              We believe transferring files between devices should be
              simple, accessible, and free from unnecessary steps.
            </p>

            <p className="text-sm leading-8 text-slate-500 sm:text-base">
              SYF was created to provide a straightforward way to upload,
              share, and download files without creating an account.
            </p>
          </div>

          <div className="flex min-h-64 items-center justify-center rounded-3xl border border-marina-100 bg-gradient-to-br from-marina-50 to-white p-8">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-marina-100 bg-white shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-20 w-20 text-marina-500">
                <rect x="3" y="4" width="18" height="13" rx="2" />
                <path d="M8 21h8m-4-4v4M8 10h8m-8 3h5" />
              </svg>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="space-y-8">
          <div className="animate-fade-up space-y-3 text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-marina-500">
              What Matters to Us
            </span>

            <h2 className="text-3xl font-extrabold text-marina-700">
              Our Values
            </h2>

            <p className="mx-auto max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              The principles that guide our approach to file sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <article
                key={value.title}
                className={`animate-fade-up rounded-2xl border border-marina-100 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-marina-300 hover:bg-marina-50/20 animation-delay-${index === 0 ? "200" : "300"}`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
                  {value.icon}
                </div>

                <h3 className="mb-2 text-lg font-extrabold text-marina-700">
                  {value.title}
                </h3>

                <p className="text-sm leading-7 text-slate-500">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Why Choose SYF Section */}
        <section className="animate-fade-up rounded-3xl border border-marina-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">

            <div className="space-y-4">
              <span className="text-sm font-bold uppercase tracking-wider text-marina-500">
                The SYF Advantage
              </span>

              <h2 className="text-3xl font-extrabold text-marina-700">
                Why Choose SYF?
              </h2>

              <p className="text-sm leading-8 text-slate-500 sm:text-base">
                SYF offers a simple way to transfer files without
                complicated processes.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-marina-100 text-marina-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>

                  {benefit}
                </li>
              ))}
            </ul>

          </div>
        </section>

      </div>
    </main>
  );
}

export default About;
