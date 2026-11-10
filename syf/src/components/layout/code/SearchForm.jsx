
function SearchForm({ code, setCode, onSearch, isSearching }) {
  function handleSubmit(event) {
    event.preventDefault();

    if (isSearching || code.trim().length !== 5) {
      return;
    }

    onSearch();
  }

  return (
    <section className="animate-fade-up rounded-2xl border border-marina-100 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-marina-300 sm:p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
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
              d="m21 21-4.5-4.5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </span>

        <div>
          <h2 className="text-xl font-extrabold text-marina-700">
            Receive Files
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter the 5-character share code to find your package.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex w-full max-w-md flex-col gap-4"
      >
        <input
          type="text"
          value={code}
          onChange={(event) =>
            setCode(event.target.value.toUpperCase().slice(0, 5))
          }
          placeholder="ABCDE"
          maxLength={5}
          autoComplete="off"
          aria-label="5-character share code"
          className="min-h-14 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-2xl font-extrabold tracking-[0.3em] text-marina-700 uppercase outline-none transition-colors duration-200 placeholder:text-slate-300 hover:border-marina-200 hover:bg-marina-50/20 focus:border-marina-500 focus:ring-2 focus:ring-marina-100"
        />

        <button
          type="submit"
          disabled={code.trim().length !== 5 || isSearching}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-marina-300 bg-marina-100 px-5 py-3 font-bold text-black transition-colors duration-200 hover:border-marina-500 hover:bg-marina-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
        >
          {isSearching ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                />
              </svg>
              Searching...
            </>
          ) : (
            <>
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
                  d="m21 21-4.5-4.5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
              Search Package
            </>
          )}
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
