
import { QRCodeSVG } from "qrcode.react";

function QRCodeDisplay({ code }) {
  const downloadUrl = `${window.location.origin}/download/${code}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(downloadUrl);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  }

  return (
    <section className="flex h-full flex-col items-center justify-center border-b border-marina-100/80 bg-gradient-to-br from-marina-50/45 to-white px-5 py-8 text-center sm:px-8 sm:py-10 md:border-b-0 md:border-r lg:px-10">
      <span className="icon-tile mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
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
            d="M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h3v3h-3v-3Zm4 0h3v7h-7v-3"
          />
        </svg>
      </span>

      <h2 className="text-lg font-extrabold text-marina-700">
        Scan QR Code
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Scan this code to open the download page.
      </p>

      <div className="my-5 flex w-full items-center justify-center rounded-2xl bg-white p-3 shadow-sm ring-1 ring-marina-100 sm:my-6 sm:p-4">
        <QRCodeSVG
          value={downloadUrl}
          size={300}
          level="H"
          includeMargin
          className="h-auto w-full max-w-[300px]"
        />
      </div>

      <button
        type="button"
        onClick={handleCopyLink}
        className="action-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-marina-300 bg-marina-100 px-6 py-3 font-bold text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marina-500"
      >
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
            d="M13.5 6H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4.5M15 3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
          />
        </svg>
        Copy Download Link
      </button>
    </section>
  );
}

export default QRCodeDisplay;
