
import SelectedItem from "./SelectedItem.jsx";
import { calculateTotalSize } from "../../../utils/uploadValidation";

export default function SelectedFiles({ files, onRemove }) {
  const totalSize = calculateTotalSize(files);
  const maxSize = 10 * 1024 * 1024;
  const totalSizeExceeded = totalSize > maxSize;
  const progress = Math.min((totalSize / maxSize) * 100, 100);

  return (
    <div className="w-full min-w-0 space-y-4">

      {/* Selected Files Summary */}
      <div className="rounded-2xl border border-marina-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
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
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 2v6h6M8 13h8m-8 4h8"
                />
              </svg>
            </span>

            <div>
              <h3 className="text-base font-extrabold text-slate-800">
                Selected Files
              </h3>
              <p className="text-xs text-slate-500">
                {files.length} {files.length === 1 ? "file" : "files"} selected
              </p>
            </div>
          </div>

          <span className="rounded-xl bg-marina-50 px-3 py-1.5 text-sm font-bold text-marina-700">
            {files.length}
          </span>
        </div>

        {/* Storage Progress */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Total size
            </span>

            <span
              className={`text-xs font-bold ${
                totalSizeExceeded ? "text-red-600" : "text-marina-700"
              }`}
            >
              {(totalSize / (1024 * 1024)).toFixed(2)} MB / 10 MB
            </span>
          </div>

          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label="Total selected files size"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                totalSizeExceeded ? "bg-red-500" : "bg-marina-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {totalSizeExceeded && (
            <p className="text-xs font-medium text-red-600">
              Total size exceeds the 10 MB limit.
            </p>
          )}
        </div>
      </div>

      {/* Files List */}
      <div className="flex min-w-0 flex-col gap-3">
        {files.map((file) => (
          <SelectedItem
            key={`${file.name}-${file.lastModified}`}
            file={file}
            onRemove={() => onRemove(file)}
          />
        ))}
      </div>
    </div>
  );
}
