// apiService.js
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

export async function updateStatusDevice(idDevice, status) {
  const token = getCookie("token");
  const updateStatusUrl = `https://example.com/api/updateStatus?id=${idDevice}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ status });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(updateStatusUrl, requestOptions);
    const result = await response.text();
    console.log("Status berhasil diupdate:", JSON.parse(result));
    return JSON.parse(result);
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    throw error; // Rethrow the error to be caught in the calling function
  }
}
