
function PasswordForm({ password, setPassword, onSubmit, isSubmitting }) {
  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || password.length === 0) {
      return;
    }

    onSubmit();
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Password Protected
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        This package requires a password before you can view its files.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <label
          htmlFor="packagePassword"
          className="text-sm font-medium text-slate-700"
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
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="submit"
          disabled={password.length === 0 || isSubmitting}
          className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Verifying..." : "Unlock Package"}
        </button>
      </form>
    </section>
  );
}

export default PasswordForm;
