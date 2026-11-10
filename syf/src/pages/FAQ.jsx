
import { useState } from "react";

const faqSections = [
  {
    title: "General Questions",
    questions: [
      {
        question: "What is SYF?",
        answer:
          "SYF is a file-sharing platform that allows users to transfer files between devices using a unique code.",
      },
      {
        question: "Is SYF free to use?",
        answer:
          "Yes, SYF is free to use. You can upload and share files without creating an account.",
      },
      {
        question: "Do I need to create an account?",
        answer:
          "No. You can use SYF without registration or login.",
      },
      {
        question: "Can I use SYF on different devices?",
        answer:
          "Yes. You can upload files from one device and download them from another device using the sharing code.",
      },
    ],
  },
  {
    title: "Uploading Files",
    questions: [
      {
        question: "How can I upload files?",
        answer:
          "Go to the Upload page, select your files or drag and drop them into the upload area, then click the Upload button.",
      },
      {
        question: "What file types are supported?",
        answer:
          "SYF supports common file formats, including PDF, documents, spreadsheets, presentations, images, text files, CSV, and ZIP archives.",
      },
      {
        question: "What is the maximum upload size?",
        answer:
          "The maximum total upload size is 10 MB per package.",
      },
      {
        question: "Can I upload multiple files at once?",
        answer:
          "Yes. You can upload multiple files together in a single package.",
      },
      {
        question: "Can I set a password for my files?",
        answer:
          "Yes. You can optionally protect your package with a password during the upload process.",
      },
    ],
  },
  {
    title: "Sharing Codes",
    questions: [
      {
        question: "What is a sharing code?",
        answer:
          "A sharing code is a unique code generated after uploading your files. It allows others to access your file package.",
      },
      {
        question: "Where can I find my sharing code?",
        answer:
          "Your sharing code is displayed after a successful upload on the package details page.",
      },
      {
        question: "How can I receive files using a code?",
        answer:
          "Open the Code page, enter the sharing code, and follow the instructions to access the files.",
      },
      {
        question: "How many characters does a sharing code have?",
        answer:
          "Each SYF sharing code contains 5 characters.",
      },
    ],
  },
  {
    title: "Downloading Files",
    questions: [
      {
        question: "How can I download shared files?",
        answer:
          "Enter the sharing code on the Code page. Once the package is found, you can access its files and download them.",
      },
      {
        question: "Can I download a single file?",
        answer:
          "Yes. You can download individual files from a package.",
      },
      {
        question: "Can I download all files together?",
        answer:
          "Yes. You can download the entire package as a ZIP archive.",
      },
      {
        question: "What happens if a package expires?",
        answer:
          "Once a package expires, it is no longer available for downloading.",
      },
      {
        question: "Why is my sharing code not working?",
        answer:
          "The package may have expired, the code may be incorrect, or the package may no longer be available.",
      },
    ],
  },
  {
    title: "Security & Privacy",
    questions: [
      {
        question: "Are my files protected with a password?",
        answer:
          "You can optionally add a password to your package. Anyone accessing a protected package will need the password to continue.",
      },
      {
        question: "How long are my files available?",
        answer:
          "You can choose an expiration period when creating a package. Available options range from 24 hours to 7 days.",
      },
      {
        question: "Does SYF require personal information?",
        answer:
          "No account or registration is required to use the file-sharing service.",
      },
      {
        question: "Should I share my code with everyone?",
        answer:
          "Only share your code with people you trust. If your package is password-protected, share the password securely as well.",
      },
    ],
  },
];

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (sectionIndex, questionIndex) => {
    const id = `${sectionIndex}-${questionIndex}`;

    setOpenQuestion((current) => (current === id ? null : id));
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-b from-marina-50/40 via-white to-white">
      {/* Hero Section */}
      <section className="px-4 pb-12 pt-16 text-center sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-3xl animate-fade-up">
          

          <h1 className="text-3xl font-extrabold tracking-tight text-marina-700 sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-marina-700/70 sm:text-lg">
            Find answers to common questions about using SYF
            and sharing your files.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="space-y-10">
          {faqSections.map((section, sectionIndex) => (
            <div
              key={section.title}
              className="animate-fade-up"
              style={{
                animationDelay: `${sectionIndex * 100}ms`,
              }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-7 w-1 rounded-full bg-marina-300" />

                <h2 className="text-xl font-bold text-marina-700 sm:text-2xl">
                  {section.title}
                </h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-marina-100 bg-white shadow-sm">
                {section.questions.map((item, questionIndex) => {
                  const id = `${sectionIndex}-${questionIndex}`;
                  const isOpen = openQuestion === id;

                  return (
                    <article
                      key={item.question}
                      className="border-b border-marina-100 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          toggleQuestion(sectionIndex, questionIndex)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left transition-colors duration-200 hover:bg-marina-50/40 sm:px-6"
                      >
                        <span className="text-sm font-semibold leading-6 text-marina-700 sm:text-base">
                          {item.question}
                        </span>

                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-marina-50 text-marina-700 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m6 9 6 6 6-6"
                            />
                          </svg>
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-6">
                          <p className="border-l-2 border-marina-300 pl-4 text-sm leading-7 text-marina-700/70 sm:text-base">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 rounded-3xl border border-marina-100 bg-gradient-to-br from-marina-50 to-white px-5 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-marina-700">
            Still Have Questions?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-marina-700/70 sm:text-base">
            Can't find the answer you're looking for?
            Feel free to contact us. We're happy to help.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-marina-300 px-7 py-3 font-bold text-black transition-colors duration-200 hover:bg-marina-100"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

export default FAQ;
