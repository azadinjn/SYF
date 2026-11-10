
function PasswordForm({ password, setPassword, onSubmit, isSubmitting }) {
  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || password.length === 0) {
      return;
    }

    onSubmit();
  }

  return (
    <section className="animate-fade-up mx-auto w-full max-w-xl rounded-2xl border border-marina-100 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-marina-300 sm:p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-marina-50 text-marina-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-1.5 0h12A1.5 1.5 0 0 1 19.5 12v7.5A1.5 1.5 0 0 1 18 21H6a1.5 1.5 0 0 1-1.5-1.5V12A1.5 1.5 0 0 1 6 10.5Zm6 4.5v1.5"
            />
          </svg>
        </span>

        <div>
          <h2 className="text-xl font-extrabold text-marina-700">
            Password Protected
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            This package requires a password before you can view its files.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-7 flex w-full max-w-md flex-col gap-4"
      >
        <label
          htmlFor="packagePassword"
          className="text-sm font-bold text-slate-700"
        >
          Package Password
        </label>

        <input
          id="packagePassword"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter package password"
          autoComplete="current-password"
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors duration-200 placeholder:text-slate-400 hover:border-marina-200 hover:bg-marina-50/20 focus:border-marina-500 focus:ring-2 focus:ring-marina-100"
        />

        <button
          type="submit"
          disabled={password.length === 0 || isSubmitting}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-marina-300 bg-marina-100 px-5 py-3 font-bold text-black transition-colors duration-200 hover:border-marina-500 hover:bg-marina-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
        >
          {isSubmitting ? (
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
              Verifying...
            </>
          ) : (
            "Unlock Package"
          )}
        </button>
      </form>
    </section>
  );
}

export default PasswordForm;
