export default function UploadActions({
  files,
  totalSizeExceeded,
  onUpload,
  isUploading,
}) {
  return (
    <div className="flex w-full min-w-0 justify-center pt-2">
      <button
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none sm:w-auto sm:min-w-40"
        disabled={files.length === 0 || totalSizeExceeded || isUploading}
        onClick={onUpload}
      >
        {isUploading ? "Preparing..." : "Upload"}
      </button>
    </div>
  );
}
