
export default function UploadZone({ onFilesSelected }) {
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    onFilesSelected(droppedFiles);
  }

  function handleChange(e) {
    const selectedFiles = Array.from(e.target.files);

    onFilesSelected(selectedFiles);

    e.target.value = "";
  }

  return (
    <div
      className="group w-full min-w-0 rounded-3xl border-2 border-dashed border-marina-300 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-marina-500 hover:bg-marina-50/40 hover:shadow-lg sm:p-10"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        htmlFor="fileInput"
        className="flex min-h-48 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl text-center outline-none focus-within:ring-2 focus-within:ring-marina-500 focus-within:ring-offset-4 sm:min-h-56"
      >
        {/* Upload Icon */}
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-marina-100 text-marina-700 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 sm:h-20 sm:w-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-8 w-8 sm:h-10 sm:w-10"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0L7 9m5-5 5 5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2"
            />
          </svg>
        </span>

        {/* Main Text */}
        <div className="space-y-2">
          <h2 className="text-lg font-extrabold text-marina-700 sm:text-xl">
            Drag & Drop your files here
          </h2>

          <p className="text-sm text-slate-500">
            or{" "}
            <span className="font-bold text-marina-500  decoration-marina-300 underline-offset-4 transition-colors group-hover:text-marina-700">
              click to browse
            </span>
          </p>
        </div>

        {/* File Information */}
        <div className="rounded-xl bg-marina-50 px-4 py-3">
          <p className="text-xs font-semibold text-marina-700 sm:text-sm">
            Select multiple files at once
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Maximum total size: 10 MB
          </p>
        </div>
      </label>

      <input
        type="file"
        id="fileInput"
        multiple
        className="sr-only"
        onChange={handleChange}
      />
    </div>
  );
}
