
function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using SYF, you agree to comply with these Terms of Service. If you do not agree with these terms, please do not use the service.",
      ],
    },
    {
      title: "2. Using SYF",
      content: [
        "SYF allows users to upload files, generate sharing codes, and download shared files without creating an account.",
        "You agree to use the service only for lawful purposes and in accordance with these terms.",
      ],
    },
    {
      title: "3. User Responsibilities",
      content: [
        "You are responsible for the files you upload and share. You must ensure that you have the necessary rights or permission to share any content.",
        "You must not use SYF to distribute harmful, illegal, abusive, or unauthorized content.",
      ],
    },
    {
      title: "4. Prohibited Content and Activities",
      content: [
        "You must not use SYF to:",
      ],
      list: [
        "Share illegal content or copyrighted material without permission.",
        "Distribute malware, viruses, or harmful files.",
        "Attempt to access other users' files without authorization.",
        "Abuse, disrupt, or interfere with the service.",
        "Use the platform for fraudulent or harmful activities.",
      ],
    },
    {
      title: "5. File Uploads and Sharing",
      content: [
        "Uploaded files are temporarily stored to enable sharing and downloading. You are responsible for choosing who receives your sharing code and password.",
        "SYF does not guarantee the availability of files beyond their configured expiration period.",
      ],
    },
    {
      title: "6. Sharing Codes and Passwords",
      content: [
        "Sharing codes and passwords are used to access file packages. Anyone with the required access information may be able to download the shared files.",
        "Keep your codes and passwords private. SYF is not responsible for unauthorized access resulting from sharing these details.",
      ],
    },
    {
      title: "7. File Expiration and Availability",
      content: [
        "File packages are available for a limited period selected during upload. After expiration, files may be removed and cannot be guaranteed to remain available.",
      ],
    },
    {
      title: "8. Service Availability",
      content: [
        "We aim to keep SYF available and functioning properly, but we do not guarantee uninterrupted or error-free access to the service.",
      ],
    },
    {
      title: "9. Limitation of Liability",
      content: [
        "To the extent permitted by applicable law, SYF shall not be liable for indirect damages, data loss, or issues resulting from the use or inability to use the service.",
      ],
    },
    {
      title: "10. Changes to These Terms",
      content: [
        "We may update these Terms of Service from time to time. Updated terms will be published on this page with a revised date.",
      ],
    },
    {
      title: "11. Contact Us",
      content: [
        "If you have questions about these terms, please contact us through our Contact page.",
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
            Terms of Service
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-slate-500 sm:text-base">
            Please read these terms carefully before using SYF.
            By accessing or using our service, you agree to these terms.
          </p>

          <p className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-marina-100">
            Last updated: November 2026
          </p>
        </section>

        {/* Terms Content */}
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
                Terms Overview
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Please review the following conditions before using SYF.
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

                {section.list && (
                  <ul className="mt-4 space-y-3">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-7 text-slate-600 sm:text-base"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-marina-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

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
          Thank you for using SYF. We appreciate your trust.
        </p>

      </div>
    </main>
  );
}

export default Terms;
