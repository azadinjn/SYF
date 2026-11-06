import SelectedItem from "./SelectedItem.jsx";
import { calculateTotalSize } from "../../../utils/uploadValidation";

export default function SelectedFiles({ files, onRemove }) {
  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <p className="text-sm font-semibold text-slate-900 sm:text-base">
          Selected files
        </p>
        <span className="text-slate-300">—</span>
        <span className="inline-flex items-center justify-center rounded-lg bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700">
          {files.length}
        </span>
        <span className="text-slate-300">—</span>
        <span
          className={`text-sm font-medium ${calculateTotalSize(files) > 10 * 1024 * 1024 ? "text-red-600" : "text-slate-600"}`}
        >
          {(calculateTotalSize(files) / (1024 * 1024)).toFixed(2)}MB / 10MB
        </span>
      </div>

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
