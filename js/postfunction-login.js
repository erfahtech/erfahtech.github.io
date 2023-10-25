import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

export default function postLogin() {
  let email = getValue("emaillogin");
  let password = getValue("passwordlogin");
  const loadingElement = document.getElementById("loading"); // Get the loading element by its ID

  // Validate that email and password are not empty
  if (!email || !password) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Please fill in both email and password fields.",
    });
    return;
  }

  // Show the loading animation
  loadingElement.style.display = "block";
  // Simulate a loading delay (you can adjust the time as needed)
  let target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-post";
  let tokenkey = "token";
  let tokenvalue = "c49482e6de1fa07a349f354c2277e11bc7115297a40a1c09c52ef77b905d07c4";
  let datainjson = {
    email: email,
    password: password,
  };

  postWithToken(target_url, tokenkey, tokenvalue, datainjson, responseData, () => {
    loadingElement.style.display = "none";
  });
}

function responseData(result) {
  if (result.token) {
    // Jika memiliki token, simpan token di cookie
    setCookieWithExpireHour("token", result.token, 2);
    // Simpan pesan hasil respons di local storage
    // localStorage.setItem("message", result.message);

    // Hide the login button
    const loginButton = document.getElementById("buttonlogin");
    loginButton.style.display = "none";

    // Tampilkan SweetAlert berhasil login
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "You have successfully logged in.",
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "../user/dashboard1.html";
      }
    });
  } else {
    // Jika tidak memiliki token, tampilkan SweetAlert pesan kesalahan
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message,
    });
  }
}
