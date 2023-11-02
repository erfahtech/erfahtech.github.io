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
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Server returned an error");
      }
    })
    .then((result) => {
      responseData(result);
    })
    .catch((error) => {
      // Handle errors (e.g., network issues or server errors)
      console.error("Error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
    })
    .finally(() => {
      loadingElement.style.display = "none";
    });
};

const responseData = (result) => {
  if (result) {
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
};

window.postSignUp = postSignUp;
