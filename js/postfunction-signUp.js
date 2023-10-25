import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
// import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

export default function postSignUp() {
  let email = getValue("emailsignup");
  let username = getValue("usernamesignup");
  let password = getValue("passwordsignup");
  const loadingElement = document.getElementById("loading"); // Get the loading element by its ID

  // Show the loading animation
  loadingElement.style.display = "block";

  // Validasi isian tidak boleh kosong
  if (!email || !username || !password) {
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: "Please fill in all fields.",
    });
    // Hide the loading animation in case of validation error
    loadingElement.style.display = "none";
    return;
  }

  let target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/post-signUp";
  let datainjson = {
    email: email,
    username: username,
    password: password,
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
      title: "SignUp Successful",
      text: "You have successfully signed up.",
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "login.html";
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: result.message,
    });
  }
}
