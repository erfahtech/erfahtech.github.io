import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";

const postSignUp = () => {
  const email = getValue("emailsignup");
  const username = getValue("usernamesignup");
  const password = getValue("passwordsignup");
  const loadingElement = document.getElementById("loading");

  loadingElement.style.display = "block";

  if (!email || !username || !password) {
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: "Please fill in all fields.",
    });

    loadingElement.style.display = "none";
    return;
  }

  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-signup";
  const datainjson = {
    email,
    username,
    password,
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
      console.error("Error:", error);
      console.log("Error:", result.message);
    })
    .finally(() => {
      loadingElement.style.display = "none";
    });
};

const responseData = (result) => {
  if (result.status === true) {
    // Ganti "status" dengan properti yang sesuai dalam respons Anda
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
      text: result.message, // Ganti "message" dengan properti yang sesuai dalam respons Anda
    });
  }
};

window.postSignUp = postSignUp;
