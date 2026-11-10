
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      return;
    }

    try {
      setIsSending(true);
      setStatus("");

      formRef.current.elements.time.value =
        new Date().toLocaleString("en-GB", {
          timeZone: "Africa/Casablanca",
        });

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        { publicKey }
      );

      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const inputStyle =
    "w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors duration-200 placeholder:text-slate-400 hover:border-marina-200 hover:bg-marina-50/20 focus:border-marina-500 focus:ring-2 focus:ring-marina-100";

  const labelStyle =
    "mb-2 block text-sm font-bold text-slate-700";

  return (
    <main className="min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-b from-marina-50/40 via-white to-white">

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-10 sm:px-6 sm:py-14 lg:gap-16">

        {/* Hero Section */}
        <section className="animate-fade-up mx-auto max-w-3xl space-y-4 text-center">

          <h1 className="text-3xl font-extrabold tracking-tight text-marina-700 sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-slate-500 sm:text-base">
            Have a question, suggestion, or need help?
            We'd love to hear from you.
          </p>
        </section>

        {/* Contact Content */}
        <section className="grid animate-fade-up gap-8 lg:grid-cols-5">

          {/* Contact Information */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="space-y-3">
              <span className="text-sm font-bold uppercase tracking-wider text-marina-500">
                Get in Touch
              </span>

              <h2 className="text-2xl font-extrabold text-marina-700 sm:text-3xl">
                We'd Love to Hear From You
              </h2>

              <p className="text-sm leading-7 text-slate-500">
                You can contact us using the information below.
                Send us your questions or feedback and we'll do
                our best to help.
              </p>
            </div>

            <article className="rounded-2xl border border-marina-100 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-marina-300 hover:bg-marina-50/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>

              <h3 className="mb-2 text-lg font-extrabold text-marina-700">
                Email
              </h3>

              <p className="text-sm leading-7 text-slate-500">
                For general questions and support, send us
                a message through the contact form.
              </p>
            </article>

            <article className="rounded-2xl border border-marina-100 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-marina-300 hover:bg-marina-50/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                  <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                  <path d="M9 12h6m-3-3v6" />
                </svg>
              </div>

              <h3 className="mb-2 text-lg font-extrabold text-marina-700">
                Support
              </h3>

              <p className="text-sm leading-7 text-slate-500">
                Need help using SYF? Send us a message
                through the contact form.
              </p>
            </article>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-marina-100 bg-white p-5 shadow-sm sm:p-8 lg:col-span-3">
            <div className="mb-7 space-y-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-marina-50 text-marina-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
                  <path d="M4 4h16v16H4z" />
                  <path d="m4 6 8 7 8-7" />
                </svg>
              </div>

              <h2 className="text-xl font-extrabold text-marina-700 sm:text-2xl">
                Send Us a Message
              </h2>

              <p className="text-sm text-slate-500">
                Fill out the form below and we'll get back to you.
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <input type="hidden" name="time" value="" />

              <div>
                <label htmlFor="name" className={labelStyle}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelStyle}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="subject" className={labelStyle}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter message subject"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelStyle}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message..."
                  rows="5"
                  required
                  className={`${inputStyle} resize-y`}
                />
              </div>

              {status === "success" && (
                <p
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700"
                >
                  Your message has been sent successfully!
                </p>
              )}

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600"
                >
                  Something went wrong. Please try again later.
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-marina-300 bg-marina-100 px-6 py-3 text-sm font-extrabold text-black shadow-sm transition-colors duration-200 hover:border-marina-500 hover:bg-marina-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              >
                {isSending ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </section>
      </div>
    </main>
  );
}

export default Contact;
