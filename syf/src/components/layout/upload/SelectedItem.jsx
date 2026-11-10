
export default function SelectedItem({ file, onRemove }) {
  return (
    <div className="group flex w-full min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-marina-300 hover:shadow-md sm:gap-4 sm:p-4">

      {/* File Icon */}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-marina-50 text-marina-700 transition-colors duration-200 group-hover:bg-marina-100 sm:h-12 sm:w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 2v6h6"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 13h8m-8 4h5"
          />
        </svg>
      </span>

      {/* File Information */}
      <div className="min-w-0 flex-1 space-y-1">
        <p className="break-words text-sm font-bold text-slate-800 [overflow-wrap:anywhere] sm:text-base">
          {file.name}
        </p>

        <p className="text-xs font-medium text-slate-400">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      </div>

      {/* Remove Button */}
      <button
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 6 6 18M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
