export default function RejectedFilesList({ rejectedFiles }) {
  if (rejectedFiles.length === 0) return null;

  return (
    <div className="w-full min-w-0 space-y-3 rounded-2xl border border-red-200 bg-white p-4 sm:p-5">
      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
        Rejected files
      </h3>

      {rejectedFiles.map((group, index) => (
        <div
          key={index}
          className="min-w-0 space-y-3 rounded-xl border border-red-100 bg-red-50/50 p-3 sm:p-4"
        >
          <p className="break-words text-sm font-medium leading-6 text-red-700 [overflow-wrap:anywhere]">
            {group.message}
          </p>

          {group.files.map((file) => (
            <p
              key={`${file.name}-${file.lastModified}`}
              className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-red-100 pt-3"
            >
              <span className="min-w-0 flex-1 break-words text-sm text-slate-700 [overflow-wrap:anywhere]">
                {file.name}
              </span>
              <span className="shrink-0 whitespace-nowrap text-xs font-medium text-slate-500 sm:text-sm">
                {(file.size / (1024 * 1024)).toFixed(2)}MB
              </span>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
