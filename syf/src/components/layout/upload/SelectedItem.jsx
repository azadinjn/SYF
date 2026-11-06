export default function SelectedItem({ file, onRemove }) {
  return (
    <div className="flex min-w-0 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors duration-200 hover:border-slate-300 sm:gap-4 sm:p-4">
      <span className="min-w-0 flex-1 break-words text-sm font-medium text-slate-800 [overflow-wrap:anywhere] sm:text-base">
        {file.name}
      </span>

      <span className="shrink-0 whitespace-nowrap text-xs text-slate-500 sm:text-sm">
        {(file.size / (1024 * 1024)).toFixed(2)}MB
      </span>

      <button
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        type="button"
      >
        X
      </button>
    </div>
  );
}
