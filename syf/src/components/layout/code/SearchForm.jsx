
function SearchForm({ code, setCode, onSearch, isSearching }) {
  function handleSubmit(event) {
    event.preventDefault();

    if (isSearching || code.trim().length !== 5) {
      return;
    }

    onSearch();
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Receive Files
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Enter the 5-character share code to find your package.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <input
          type="text"
          value={code}
          onChange={(event) =>
            setCode(event.target.value.toUpperCase().slice(0, 5))
          }
          placeholder="ABCDE"
          maxLength={5}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-xl font-bold tracking-[0.3em] uppercase outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="submit"
          disabled={code.trim().length !== 5 || isSearching}
          className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSearching ? "Searching..." : "Search Package"}
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
