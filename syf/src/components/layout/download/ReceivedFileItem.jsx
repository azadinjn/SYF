
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
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">
            {file.name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {formatFileSize(Number(file.size))}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {extension}
          </span>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDownloading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default ReceivedFileItem;
