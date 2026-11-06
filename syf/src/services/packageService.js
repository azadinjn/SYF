
const API_URL = "http://localhost/syf-backend/api/package.php";

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
