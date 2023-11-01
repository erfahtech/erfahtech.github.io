import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

export default function postDevices() {
  const nama = document.getElementById("isiName").value;
  const topic = document.getElementById("isiTopic").value;
  const loadingElement = document.getElementById("loading"); // Get the loading element by its ID

  document.getElementById('diabutton').style.display = "none";

  // Show the loading animation
  loadingElement.style.display = "block";

  // Validasi isian tidak boleh kosong
  if (nama == "" || topic == "") {
    Swal.fire({
      icon: "error",
      title: "Gagal Menambahkan Device",
      text: "Please fill in all fields.",
    });
    // Hide the loading animation in case of validation error
    loadingElement.style.display = "none";
    document.getElementById('diabutton').style.display = "block";
    return;
  }

  let target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertdevices";
  let datainjson = {
    name: nama,
    topic: topic,
  };

  postWithBearer(target_url, getCookie("token"), datainjson, responseData, () => {
    loadingElement.style.display = "none";
  });
}

function responseData(result) {
  if (result) {
    // Tampilkan SweetAlert berhasil signUp
    Swal.fire({
      icon: "success",
      title: "Tambah Device Berhasil",
      text: result.message,
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "device_control.html";
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
