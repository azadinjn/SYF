import { API_BASE_URL } from "../config/api";
const API_URL = `${API_BASE_URL}/download.php`;

function getFilename(contentDisposition, fallback) {
  if (!contentDisposition) return fallback;

  // Prefer the UTF-8 filename when available
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);

  if (utf8Match) {
    try {
      return decodeURIComponent(utf8Match[1]);
    } catch {
      return fallback;
    }
  }

  const filenameMatch = contentDisposition.match(/filename="([^"]+)"/i);

  return filenameMatch?.[1] || fallback;
}

export async function downloadFile({
  code,
  password = "",
  fileId = null,
  downloadAll = false,
}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      password,
      downloadAll,
      ...(downloadAll ? {} : { fileId }),
    }),
  });

  if (!response.ok) {
    let message = "Download failed. Please try again.";

    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      // The server did not return a JSON error response.
    }

    throw new Error(message);
  }

  const blob = await response.blob();

  const fallbackName = downloadAll ? "package.zip" : "download";

  const filename = getFilename(
    response.headers.get("Content-Disposition"),
    fallbackName
  );

  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = fileUrl;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);

  return true;
}
