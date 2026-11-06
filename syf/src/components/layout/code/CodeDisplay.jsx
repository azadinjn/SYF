
function CodeDisplay({ code }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
      <h2 className="text-lg font-semibold text-slate-900">
        Your Share Code
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Share this code with the person receiving your files.
      </p>

      <p className="my-6 text-4xl font-bold tracking-[0.3em] text-blue-600">
        {code}
      </p>

      <button
        type="button"
        onClick={handleCopy}
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Copy Code
      </button>
    </section>
  );
}

export default CodeDisplay;
