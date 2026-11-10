
import { Link } from "react-router";

function Home() {
  return (
    <main className="overflow-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-marina-50 via-white to-marina-100/60">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">

          <div className="animate-fade-up">

            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-marina-700 sm:text-6xl lg:text-7xl">
              Share Files.
              <br />
              <span className="text-marina-500">Simply.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
              Transfer files between devices quickly and easily.
              No account required. Just upload, share, and download.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/upload"
                className="rounded-xl bg-marina-100 px-7 py-3.5 font-extrabold text-black shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-marina-300 hover:shadow-lg active:scale-95"
              >
                Start Sharing
              </Link>

              <Link
                to="/code"
                className="rounded-xl border-2 border-marina-300 bg-white px-7 py-3.5 font-extrabold text-black transition duration-300 hover:-translate-y-1 hover:bg-marina-50 active:scale-95"
              >
                Receive Files
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="animate-fade-up animation-delay-200 flex justify-center">
            <div className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-[3rem] bg-marina-100/70 p-10">
              <div className="absolute h-64 w-64 animate-float rounded-full bg-marina-300/30 blur-3xl"></div>

              <div className="relative flex h-56 w-56 animate-float items-center justify-center rounded-[2.5rem] border border-white bg-white shadow-2xl sm:h-64 sm:w-64">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-marina-100 text-4xl text-marina-700">
                    ↗
                  </div>
                  <p className="mt-5 text-xl font-black text-marina-700">
                    Share Anywhere
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Fast & Easy Transfer
                  </p>
                </div>
              </div>

              <div className="absolute right-3 top-10 animate-float rounded-2xl bg-white px-4 py-3 shadow-lg">
                <span className="text-sm font-bold text-marina-700">
                  Secure
                </span>
              </div>

              <div className="absolute bottom-10 left-2 animate-float rounded-2xl bg-white px-4 py-3 shadow-lg animation-delay-300">
                <span className="text-sm font-bold text-marina-700">
                  No Account
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="animate-fade-up mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-extrabold uppercase tracking-widest text-marina-500">
            Features
          </span>

          <h2 className="mt-3 text-3xl font-black text-marina-700 sm:text-4xl">
            Why Choose SYF?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Everything you need to share files easily and securely.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {[
            {
              icon: "⚡",
              title: "Fast Transfer",
              description: "Share your files quickly without complicated steps.",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              description: "Your files are shared through unique codes without requiring an account.",
            },
            {
              icon: "✓",
              title: "No Registration",
              description: "Start sharing immediately. No account or sign-up required.",
            },
            {
              icon: "📁",
              title: "Multiple Files",
              description: "Upload and share multiple files together in one package.",
            },
            {
              icon: "🔗",
              title: "Easy Access",
              description: "Receive files using a simple sharing code.",
            },
            {
              icon: "⏱",
              title: "Automatic Expiration",
              description: "Shared files are available for a limited time.",
            },
          ].map((feature, index) => (
            <article
              key={feature.title}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-fade-up rounded-2xl border border-marina-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-marina-300 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-marina-50 text-2xl text-marina-700">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-extrabold text-marina-700">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}

        </div>
      </section>

      {/* How It Works */}
      <section className="bg-marina-50/60 px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="animate-fade-up mx-auto mb-14 max-w-2xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-marina-500">
              Simple Process
            </span>

            <h2 className="mt-3 text-3xl font-black text-marina-700 sm:text-4xl">
              How It Works
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Share your files in just three simple steps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Upload Your Files",
                description: "Select one or multiple files from your device.",
              },
              {
                number: "02",
                title: "Get Your Share Code",
                description: "Once your files are uploaded, you'll receive a unique sharing code.",
              },
              {
                number: "03",
                title: "Share & Download",
                description: "Send the code to anyone so they can access and download your files.",
              },
            ].map((step, index) => (
              <article
                key={step.number}
                style={{ animationDelay: `${index * 150}ms` }}
                className="animate-fade-up relative rounded-2xl border border-marina-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <span className="text-5xl font-black text-marina-100">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-extrabold text-marina-700">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="animate-fade-up mx-auto max-w-5xl rounded-[2rem] bg-marina-100 px-7 py-16 text-center sm:px-14">

          <h2 className="text-3xl font-black text-marina-700 sm:text-4xl">
            Ready to Share Your Files?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
            Start sharing your files today. No account required.
          </p>

          <Link
            to="/upload"
            className="mt-8 inline-flex rounded-xl bg-marina-300 px-8 py-4 font-extrabold text-black shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-marina-100 hover:shadow-lg active:scale-95"
          >
            Start Sharing Now
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Home;
