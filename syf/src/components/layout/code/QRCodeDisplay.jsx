
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
    <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
      <h2 className="text-lg font-semibold text-slate-900">
        Scan QR Code
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Scan this code to open the download page.
      </p>

      <div className="my-6 flex justify-center">
        <QRCodeSVG
          value={downloadUrl}
          size={200}
          level="H"
          includeMargin
        />
      </div>

      <button
        type="button"
        onClick={handleCopyLink}
        className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Copy Download Link
      </button>
    </section>
  );
}

export default QRCodeDisplay;
