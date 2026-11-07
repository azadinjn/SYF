import { API_BASE_URL } from "../config/api";
const API_URL = `${API_BASE_URL}/upload.php`;

export async function uploadPackage(formData) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Upload failed.");
  }

  return data.transfer;
}
