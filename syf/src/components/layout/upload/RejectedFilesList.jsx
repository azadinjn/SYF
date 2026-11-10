
export default function RejectedFilesList({ rejectedFiles }) {
  if (rejectedFiles.length === 0) return null;

  return (
    <div className="animate-fade-up w-full min-w-0 space-y-4 rounded-2xl border border-red-200 bg-white p-4 shadow-sm sm:p-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
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
              d="M12 9v4m0 4h.01M10.3 3.9 2.7 17.1A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </span>

        <div>
          <h3 className="text-base font-extrabold text-slate-800 sm:text-lg">
            Rejected Files
          </h3>
          <p className="text-xs text-slate-500">
            Some files couldn't be added
          </p>
        </div>
      </div>

      {/* Rejected Groups */}
      <div className="space-y-3">
        {rejectedFiles.map((group, index) => (
          <div
            key={index}
            className="min-w-0 space-y-3 rounded-xl border border-red-100 bg-red-50/60 p-3 sm:p-4"
          >
            <p className="break-words text-sm font-bold leading-6 text-red-700 [overflow-wrap:anywhere]">
              {group.message}
            </p>

            {group.files.map((file) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="flex min-w-0 items-center gap-3 border-t border-red-100 pt-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
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
                      d="M14 2v6h6M9 13l6 6m0-6-6 6"
                    />
                  </svg>
                </span>

                <p className="min-w-0 flex-1 break-words text-sm font-medium text-slate-700 [overflow-wrap:anywhere]">
                  {file.name}
                </p>

                <span className="shrink-0 whitespace-nowrap rounded-lg bg-white px-2 py-1 text-xs font-semibold text-slate-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
