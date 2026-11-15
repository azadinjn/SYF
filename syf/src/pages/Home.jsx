import { useEffect, useRef } from "react";
import { Link } from "react-router";

function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    const home = homeRef.current;

    if (
      !home ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const revealItems = home.querySelectorAll(".scroll-reveal");

    if (revealItems.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );

    home.classList.add("scroll-reveal-ready");
    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      home.classList.remove("scroll-reveal-ready");
    };
  }, []);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
          <path d="M12 16V4m0 0L7 9m5-5 5 5" />
          <path d="M5 15v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />
        </svg>
      ),
      title: "Quick transfers",
      description: "Move your files from one device to another in just a few steps.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Private by design",
      description: "Share with a unique code, with an optional password for extra privacy.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12h8m-4-4v8" />
        </svg>
      ),
      title: "No account needed",
      description: "Get started right away—there's nothing to sign up for.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
          <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3V7Z" />
          <path d="M3 10h18" />
        </svg>
      ),
      title: "Files together",
      description: "Keep multiple files in one convenient package, ready to share.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7" />
          <path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7" />
        </svg>
      ),
      title: "Simple access",
      description: "A short sharing code makes it easy for others to find your files.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
      title: "Automatic expiry",
      description: "Choose how long your package stays available, then let it expire.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Choose your files",
      description: "Select one file or bring a few together in a package.",
    },
    {
      number: "02",
      title: "Get a share code",
      description: "SYF creates a unique code as soon as your upload is ready.",
    },
    {
      number: "03",
      title: "Share it your way",
      description: "Send the code or QR link so someone can download the files.",
    },
  ];

  return (
    <main ref={homeRef} className="overflow-hidden">
      <section className="home-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pt-6 pb-12 sm:gap-10 sm:pt-8 sm:pb-14 md:grid-cols-2 md:gap-12 md:pt-12 md:pb-16 lg:gap-16">
          <div className="animate-fade-up">
            <h1 className="page-title max-w-xl text-5xl font-extrabold leading-[1.04] text-marina-700 sm:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
              Send the file.
              <br />
              <span className="text-marina-500">Skip the hassle.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
              Move files between your devices in a few simple steps. Upload
              once, share a code, and get on with your day.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/upload"
                className="action-button inline-flex min-h-12 items-center justify-center rounded-xl border px-6 py-3 text-sm font-extrabold"
              >
                Start sharing
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ml-2 h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>

              <Link
                to="/code"
                className="secondary-button inline-flex min-h-12 items-center justify-center rounded-xl border px-6 py-3 text-sm font-extrabold"
              >
                Receive files
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-marina-500" aria-hidden="true">
                  <path d="m5 12 4 4L19 6" />
                </svg>
                No account needed
              </span>
              <span className="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-marina-500" aria-hidden="true">
                  <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                </svg>
                Optional password protection
              </span>
            </div>
          </div>

          <div className="animate-fade-up animation-delay-200 flex justify-center">
            <div className="hero-art relative aspect-square w-full max-w-[31rem]" aria-hidden="true">
              <svg className="hero-transfer-path" viewBox="0 0 500 500">
                <path d="M155 188C214 126 282 325 345 270" />
              </svg>

              <div className="hero-device hero-device--sender">
                <div className="hero-device-screen px-2.5 pb-3 pt-2.5 sm:px-3.5">
                  <span className="hero-device-notch" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold tracking-[0.15em] text-marina-700">SYF</span>
                    <span className="flex gap-1">
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-extrabold text-slate-800 sm:text-sm">Send files</p>
                  <p className="mt-1 text-[9px] leading-4 text-slate-500 sm:text-[10px]">Choose what you want to share</p>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-marina-500 shadow-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <path d="M14 2v6h6" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[9px] font-bold text-slate-700 sm:text-[10px]">Design brief.pdf</span>
                        <span className="mt-0.5 block text-[8px] text-slate-400">1.2 MB</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-marina-500 shadow-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
                          <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3V7Z" />
                          <path d="M3 10h18" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[9px] font-bold text-slate-700 sm:text-[10px]">Project assets</span>
                        <span className="mt-0.5 block text-[8px] text-slate-400">3.4 MB</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-marina-50/70 px-2 py-2 text-[9px] font-bold text-marina-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                      <path d="M12 16V4m0 0L7 9m5-5 5 5" />
                      <path d="M5 15v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />
                    </svg>
                    Ready to send
                  </div>
                </div>
              </div>

              <div className="hero-device hero-device--receiver">
                <div className="hero-device-screen px-2.5 pb-3 pt-2.5 sm:px-3.5">
                  <span className="hero-device-notch" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold tracking-[0.15em] text-marina-700">SYF</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-marina-50 text-marina-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-extrabold text-slate-800 sm:text-sm">Files received</p>
                  <p className="mt-1 text-[9px] leading-4 text-slate-500 sm:text-[10px]">2 files · 4.6 MB</p>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-marina-500 shadow-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <path d="M14 2v6h6" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[9px] font-bold text-slate-700 sm:text-[10px]">Design brief.pdf</span>
                        <span className="mt-0.5 block text-[8px] text-slate-400">1.2 MB</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-marina-500 shadow-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
                          <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3V7Z" />
                          <path d="M3 10h18" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[9px] font-bold text-slate-700 sm:text-[10px]">Project assets</span>
                        <span className="mt-0.5 block text-[8px] text-slate-400">3.4 MB</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-marina-50/70 px-2 py-2 text-[9px] font-bold text-marina-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                    Received securely
                  </div>
                </div>
              </div>

              <div className="hero-transfer-packet" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="scroll-reveal mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-marina-500">
            Made for the everyday
          </span>
          <h2 className="page-title mt-3 text-3xl font-extrabold text-marina-700 sm:text-4xl">
            Sharing should feel effortless.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            The essentials for getting files where they need to go—without the fuss.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              style={{ transitionDelay: `${index * 60}ms` }}
              className="scroll-reveal feature-card surface-card rounded-2xl border p-6 sm:p-7"
            >
              <div className="icon-tile flex h-12 w-12 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-marina-700">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-marina-50/55 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="scroll-reveal mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-marina-500">
              Three simple steps
            </span>
            <h2 className="page-title mt-3 text-3xl font-extrabold text-marina-700 sm:text-4xl">
              From upload to shared.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              No complicated setup. Just a clear path from one device to another.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.number}
                style={{ transitionDelay: `${index * 80}ms` }}
                className="scroll-reveal process-step surface-card rounded-2xl border p-7 sm:p-8"
              >
                <span className="process-step-number text-5xl font-extrabold">
                  {step.number}
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-marina-700">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="scroll-reveal mx-auto max-w-5xl rounded-[2rem] border border-marina-300/30 bg-gradient-to-br from-marina-50 via-marina-100/70 to-white px-7 py-14 text-center shadow-[0_22px_60px_rgba(0,85,130,0.08)] sm:px-14 sm:py-16">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-marina-500">
            Ready when you are
          </span>
          <h2 className="page-title mt-3 text-3xl font-extrabold text-marina-700 sm:text-4xl">
            Send something along.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Start sharing your files in moments. No account or setup required.
          </p>
          <Link
            to="/upload"
            className="action-button mt-8 inline-flex min-h-12 items-center justify-center rounded-xl border px-7 py-3 text-sm font-extrabold"
          >
            Start sharing
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ml-2 h-4 w-4" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
