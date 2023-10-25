import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
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

  postWithBearer(target_url, token, datainjson, responseData, () => {
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
