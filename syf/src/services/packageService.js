import { API_BASE_URL } from "../config/api";
const API_URL = `${API_BASE_URL}/package.php`;

export async function searchPackage(code, password = "") {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code.trim().toUpperCase(),
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Package not found.");
  }

  return data.transfer;
}
