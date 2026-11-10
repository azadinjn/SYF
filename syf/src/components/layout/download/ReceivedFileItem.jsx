
import { useState } from "react";
import { downloadFile } from "../../../services/downloadService.js";
import { formatFileSize } from "../../../utils/formatFileSize.js";

function ReceivedFileItem({ file, code, password }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  const extension = file.name.includes(".")
    ? file.name.split(".").pop().toUpperCase()
    : "FILE";

  async function handleDownload() {
    if (isDownloading) return;

    setIsDownloading(true);
    setError("");

    try {
      await downloadFile({
        code,
        password,
        fileId: file.id,
      });
    } catch (err) {
      setError(err.message || "Unable to download this file.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 transition-colors duration-200 hover:border-marina-300 hover:bg-marina-50/20 sm:p-4">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
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
                d="M8 3.75h5.25L18 8.5v11.75H6V5.75A2 2 0 0 1 8 3.75Zm5 0V9h5M9 13h6m-6 3h6"
              />
            </svg>
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800">
              {file.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {formatFileSize(Number(file.size))}
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
          <span className="inline-flex min-h-9 items-center justify-center rounded-lg border border-marina-100 bg-marina-50 px-3 py-1 text-xs font-bold text-marina-700">
            {extension}
          </span>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-marina-300 bg-marina-100 px-4 py-2 text-sm font-bold text-black transition-colors duration-200 hover:border-marina-500 hover:bg-marina-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 sm:flex-none"
          >
            {isDownloading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
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
                Downloading...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
                  />
                </svg>
                Download
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default ReceivedFileItem;
