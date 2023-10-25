import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

export default function postSignUp() {
  let nama = getValue("isiName");
  let topic = getValue("isiTopic");
  const loadingElement = document.getElementById("loading"); // Get the loading element by its ID

  // Show the loading animation
  loadingElement.style.display = "block";

  // Validasi isian tidak boleh kosong
  if (!nama || !topic) {
    Swal.fire({
      icon: "error",
      title: "Gagal Menambahkan Device",
      text: "Please fill in all fields.",
    });
    // Hide the loading animation in case of validation error
    loadingElement.style.display = "none";
    return;
  }

  let target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertDevice";
  let datainjson = {
    name: nama,
    topic: topic,
    user: getCookie("token"),
  };

  fetch(target_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datainjson),
  })
    .then((response) => response.json())
    .then((result) => {
      responseData(result);
    })
    .catch((error) => {
      // Handle errors (e.g., network issues)
      console.error("Error:", error);
    })
    .finally(() => {
      // Hide the loading animation when the request is done (whether successful or failed)
      loadingElement.style.display = "none";
    });
}

function responseData(result) {
  if (result) {
    // Tampilkan SweetAlert berhasil signUp
    Swal.fire({
      icon: "success",
      title: "Tambah Device Berhasil",
      text: "You have successfully",
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "dashboard.html";
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Tambah Device Gagal",
      text: result.message,
    });
  }
}

console.log(getCookie("token"));
