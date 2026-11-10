
import { Link } from "react-router";

function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-marina-50/40 via-white to-white px-4 py-12 sm:px-6">

      <section className="animate-fade-up mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">

        {/* 404 Illustration */}
        <div className="relative flex items-center justify-center">
          <span className="select-none text-[120px] font-extrabold leading-none tracking-tighter text-marina-100 sm:text-[180px]">
            404
          </span>

        </div>

        {/* Error Message */}
        <div className="space-y-3">

          <h1 className="text-3xl font-extrabold tracking-tight text-marina-700 sm:text-4xl">
            Page Not Found
          </h1>

          <p className="mx-auto max-w-md text-sm leading-8 text-slate-500 sm:text-base">
            Sorry, the page you are looking for doesn't exist
            or may have been moved.
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-marina-300 bg-marina-100 px-7 py-3 text-sm font-extrabold text-black shadow-sm transition-colors duration-200 hover:border-marina-500 hover:bg-marina-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V10Z" />
            </svg>
            Back to Home
          </Link>

          <Link
            to="/upload"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-marina-200 bg-white px-7 py-3 text-sm font-extrabold text-black transition-colors duration-200 hover:border-marina-300 hover:bg-marina-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path d="M12 16V4m0 0L7 9m5-5 5 5" />
              <path d="M5 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
            </svg>
            Start Sharing
          </Link>
        </div>

      </section>
    </main>
  );
}

export default NotFound;
