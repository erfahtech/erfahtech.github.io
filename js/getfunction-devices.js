// import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

export default function getDevices() {
  const loadingElement = document.getElementById("loading"); // Get the loading element by its ID

  // Show the loading animation
  loadingElement.style.display = "block";

  let target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";

  postWithBearer(target_url, getCookie("token"), responseData, () => {
    loadingElement.style.display = "none";
  });
}

function responseData(result) {
  if (result) {
    // Tampilkan SweetAlert berhasil signUp
    Swal.fire({
      icon: "success",
      title: "Get Device Berhasil",
      text: result.message,
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        // window.location.href = "tambah-devices.html";
        console.log("Data dari API:", result.data);
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Get Device Gagal",
      text: result.message,
    });
  }
}

function postWithBearer(target_url, token, responseFunction) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

console.log(getCookie("token"));
