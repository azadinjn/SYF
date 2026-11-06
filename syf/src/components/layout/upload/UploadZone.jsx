
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
  className="w-full min-w-0 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50/50 sm:p-10"
  onDragOver={handleDragOver}
  onDrop={handleDrop}
>
  <label
    htmlFor="fileInput"
    className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl text-center outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 sm:min-h-48"
  >
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 sm:h-16 sm:w-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7 sm:h-8 sm:w-8"
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

    <span className="text-base font-semibold text-slate-900 sm:text-lg">
      Drag & Drop your files here
    </span>

    <span className="text-sm text-slate-500">
      or <span className="font-semibold text-blue-600">click to browse</span>
    </span>

    <span className="text-xs text-slate-400">
      Select multiple files at once <br />
      max size 10 MB
    </span>
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
