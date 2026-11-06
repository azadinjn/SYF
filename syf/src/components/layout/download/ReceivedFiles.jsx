
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
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Files in this package
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {files.length} {files.length === 1 ? "file" : "files"} available
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadAll}
          disabled={isDownloadingAll}
          className="min-h-11 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDownloadingAll ? "Preparing ZIP..." : "Download All (ZIP)"}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3">
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
