
function Privacy() {
  const sections = [
    {
      title: "1. Introduction",
      content: [
        "SYF is a file-sharing platform that allows users to upload and share files using a unique sharing code. This Privacy Policy explains how we handle information when you use our service.",
      ],
    },
    {
      title: "2. Information We Collect",
      content: [
        "SYF does not require users to create an account or provide personal information to share files.",
        "However, we may process certain technical information necessary to operate, protect, and improve the service, such as IP addresses and server logs.",
      ],
    },
    {
      title: "3. Uploaded Files",
      content: [
        "Files uploaded to SYF are temporarily stored to allow users to share and download them.",
        "Users are responsible for the files they upload and share. Do not upload illegal or unauthorized content.",
      ],
    },
    {
      title: "4. Sharing Codes and Passwords",
      content: [
        "Each file package receives a unique sharing code. Anyone who has the code may be able to access the shared files unless password protection is enabled.",
        "Users should keep their sharing codes and passwords private and only share them with trusted people.",
      ],
    },
    {
      title: "5. File Expiration and Deletion",
      content: [
        "Shared file packages have a limited expiration period. After expiration, files are no longer available for download and may be permanently deleted from our storage.",
      ],
    },
    {
      title: "6. Cookies and Similar Technologies",
      content: [
        "SYF may use cookies or similar technologies when necessary for the functionality, security, and performance of the service.",
      ],
    },
    {
      title: "7. Third-Party Services",
      content: [
        "We may use third-party services to support certain features, such as email communication and website analytics. These services may process information according to their own privacy policies.",
      ],
    },
    {
      title: "8. Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated revision date.",
      ],
    },
    {
      title: "9. Contact Us",
      content: [
        "If you have questions about this Privacy Policy, please contact us through our Contact page.",
      ],
      isContact: true,
    },
  ];

  return (
    <main className="min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-b from-marina-50/40 via-white to-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">

        {/* Hero Section */}
        <section className="animate-fade-up space-y-4 text-center">

          <h1 className="text-3xl font-extrabold tracking-tight text-marina-700 sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-slate-500 sm:text-base">
            Your privacy matters to us. Learn how SYF handles
            your information when you use our file-sharing service.
          </p>

          <p className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-marina-100">
            Last updated: November 2026
          </p>
        </section>

        {/* Policy Content */}
        <section className="animate-fade-up rounded-3xl border border-marina-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8 flex items-center gap-3 border-b border-marina-100 pb-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                <path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                <path d="M14 3v5h5M8 13h8m-8 4h8" />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-marina-700">
                Privacy Overview
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Please read this policy carefully.
              </p>
            </div>
          </div>

          <div className="flex flex-col divide-y divide-marina-50">
            {sections.map((section) => (
              <article
                key={section.title}
                className="py-7 first:pt-0 last:pb-0"
              >
                <h2 className="mb-4 text-lg font-extrabold leading-snug text-marina-700 sm:text-xl">
                  {section.title}
                </h2>

                <div className="space-y-3">
                  {section.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm leading-8 text-slate-600 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.isContact && (
                  <a
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-marina-200 bg-marina-50 px-4 py-2.5 text-sm font-bold text-marina-700 transition-colors duration-200 hover:border-marina-300 hover:bg-marina-100"
                  >
                    Contact Us
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Bottom Note */}
        <p className="animate-fade-up text-center text-xs leading-6 text-slate-400">
          Thank you for trusting SYF with your file-sharing needs.
        </p>

      </div>
    </main>
  );
}

export default Privacy;
