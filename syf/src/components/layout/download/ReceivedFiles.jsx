
import { useState } from "react";
import ReceivedFileItem from "./ReceivedFileItem.jsx";
import { downloadFile } from "../../../services/downloadService.js";

function ReceivedFiles({ files, code, password }) {
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [error, setError] = useState("");

  if (!files || files.length === 0) return null;

  async function handleDownloadAll() {
    if (isDownloadingAll) return;

    setIsDownloadingAll(true);
    setError("");

    try {
      await downloadFile({
        code,
        password,
        downloadAll: true,
      });
    } catch (err) {
      setError(err.message || "Unable to download the package.");
    } finally {
      setIsDownloadingAll(false);
    }
  }

  return (
    <section className="animate-fade-up rounded-2xl border border-marina-100 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-marina-300 sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 3.75h5.25L18 8.5v11.75H6V5.75A2 2 0 0 1 8 3.75Zm5 0V9h5M9 13h6m-6 3h6"
              />
            </svg>
          </span>

          <div>
            <h2 className="text-lg font-extrabold text-marina-700">
              Files in this Package
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {files.length} {files.length === 1 ? "file" : "files"} available
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadAll}
          disabled={isDownloadingAll}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-marina-300 bg-marina-100 px-5 py-3 text-sm font-bold text-black transition-colors duration-200 hover:border-marina-500 hover:bg-marina-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 sm:w-auto"
        >
          {isDownloadingAll ? (
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
              Preparing ZIP...
            </>
          ) : (
            <>
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
                  d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
                />
              </svg>
              Download All (ZIP)
            </>
          )}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {files.map((file) => (
          <ReceivedFileItem
            key={file.id}
            file={file}
            code={code}
            password={password}
          />
        ))}
      </div>
    </section>
  );
}

export default ReceivedFiles;
