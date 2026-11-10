
function CodeDisplay({ code }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }

  return (
    <section className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border border-marina-100 bg-white p-6 text-center shadow-sm transition-colors duration-200 hover:border-marina-300 sm:p-8">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h8A2.5 2.5 0 0 1 21 5.5v8a2.5 2.5 0 0 1-2.5 2.5H17M5.5 8h8A2.5 2.5 0 0 1 16 10.5v8a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 3 18.5v-8A2.5 2.5 0 0 1 5.5 8Z"
          />
        </svg>
      </span>

      <h2 className="text-lg font-extrabold text-marina-700">
        Your Share Code
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Share this code with the person receiving your files.
      </p>

      <p className="my-6 break-all text-4xl font-extrabold tracking-[0.25em] text-marina-700 sm:text-5xl">
        {code}
      </p>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-marina-300 bg-marina-100 px-6 py-3 font-bold text-black transition-colors duration-200 hover:border-marina-500 hover:bg-marina-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h8A2.5 2.5 0 0 1 21 5.5v8a2.5 2.5 0 0 1-2.5 2.5H17M5.5 8h8A2.5 2.5 0 0 1 16 10.5v8a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 3 18.5v-8A2.5 2.5 0 0 1 5.5 8Z"
          />
        </svg>
        Copy Code
      </button>
    </section>
  );
}

export default CodeDisplay;
