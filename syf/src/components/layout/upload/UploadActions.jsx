
export default function UploadActions({
  files,
  totalSizeExceeded,
  onUpload,
  isUploading,
}) {
  return (
    <div className="flex w-full min-w-0 justify-center pt-3">
      <button
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-marina-300 bg-marina-100 px-8 py-3 text-base font-extrabold text-black shadow-sm transition-colors duration-200 hover:border-marina-500 hover:bg-marina-100/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none sm:w-auto sm:min-w-48"
        disabled={files.length === 0 || totalSizeExceeded || isUploading}
        onClick={onUpload}
      >
        {isUploading ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            Preparing...
          </>
        ) : (
          <>
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
                d="M12 16V4m0 0L7 9m5-5 5 5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2"
              />
            </svg>
            Upload Files
          </>
        )}
      </button>
    </div>
  );
}
