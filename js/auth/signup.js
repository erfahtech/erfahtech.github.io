// import { getValue } from "https://jscroot.github.io/element/croot.js";

// const postSignUp = () => {
//   const email = getValue("emailsignup");
//   const phonenumber = getValue("phonesignup");
//   const username = getValue("usernamesignup");
//   const password = getValue("passwordsignup");
//   const loadingElement = document.getElementById("loading");

//   loadingElement.style.display = "block";

//   if (!email || !phonenumber || !username || !password) {
//     Swal.fire({
//       icon: "error",
//       title: "Signup Failed",
//       text: "Please fill in all fields.",
//     });

//     loadingElement.style.display = "none";
//     return;
//   }

//   const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-signup";
//   const datainjson = {
//     email,
//     phonenumber,
//     username,
//     password,
//   };

//   fetch(target_url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(datainjson),
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       responseData(result);
//     })
//     .finally(() => {
//       loadingElement.style.display = "none";
//     });
// };

// const responseData = (result) => {
//   if (result.status === true) {
//     Swal.fire({
//       icon: "success",
//       title: "SignUp Successful",
//       text: "You have successfully signed up.",
//     }).then((result) => {
//       if (result.isConfirmed || result.isDismissed) {
//         window.location.href = "login.html";
//       }
//     });
//   } else {
//     Swal.fire({
//       icon: "error",
//       title: "Signup Failed",
//       text: result.message,
//     });
//     loadingElement.style.display = "none";
//   }
// };

// window.postSignUp = postSignUp;

// const passwordFunc = () => {
//   const x = document.getElementById("passwordsignup");
//   const parent = x.parentNode;

//   x.type = x.type === "password" ? "text" : "password";
//   parent.classList.toggle("show", x.type === "text");
// };

// window.passwordFunc = passwordFunc;


import { getValue } from "https://jscroot.github.io/element/croot.js";

const postSignUp = () => {
  const email = getValue("emailsignup");
  const phonenumber = getValue("phonesignup");
  const username = getValue("usernamesignup");
  const password = getValue("passwordsignup");
  const loadingElement = document.getElementById("loading");

  loadingElement.style.display = "block";

  if (!email || !phonenumber || !username || !password) {
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
    phonenumber,
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
    .finally(() => {
      loadingElement.style.display = "none";
    });
};

const responseData = (result) => {
  const loadingElement = document.getElementById("loading");

  if (result.status === true) {
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
    loadingElement.style.display = "none";
  }
};

window.postSignUp = postSignUp;

const passwordFunc = () => {
  const x = document.getElementById("passwordsignup");
  const parent = x.parentNode;

  x.type = x.type === "password" ? "text" : "password";
  parent.classList.toggle("show", x.type === "text");
};

window.passwordFunc = passwordFunc;

function validateForm() {
  const email = document.getElementById('emailsignup').value;
  const phone = document.getElementById('phonesignup').value;
  const username = document.getElementById('usernamesignup').value;
  const password = document.getElementById('passwordsignup').value;

  // Email validation
  const emailValidationMessage = document.getElementById('emailValidationMessage');
  if (!validateEmail(email)) {
    emailValidationMessage.innerText = 'Format email tidak valid';
    return false;
  } else {
    emailValidationMessage.innerText = '';
  }

  // Phone validation
  const phoneValidationMessage = document.getElementById('phoneValidationMessage');
  if (!validatePhone(phone)) {
    phoneValidationMessage.innerText = 'Nomor telepon tidak valid';
    return false;
  } else {
    phoneValidationMessage.innerText = '';
  }

  // Username validation
  const usernameValidationMessage = document.getElementById('usernameValidationMessage');
  if (!validateUsername(username)) {
    usernameValidationMessage.innerText = 'Format username tidak valid';
    return false;
  } else {
    usernameValidationMessage.innerText = '';
  }

  // Password validation
  const passwordValidationMessage = document.getElementById('passwordValidationMessage');
  if (!validatePassword(password)) {
    passwordValidationMessage.innerText = 'Format password tidak valid';
    return false;
  } else {
    passwordValidationMessage.innerText = '';
  }

  return true;
}

window.validateForm = validateForm;

function postSignUpWithValidation() {
  if (validateForm()) {
    postSignUp();
  }
}

window.postSignUpWithValidation = postSignUpWithValidation;

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^62\d{5,11}$/;
  return phoneRegex.test(phone);
}

function validateUsername(username) {
  const usernameRegex = /^[A-Z][a-z]*\s[A-Z][a-z]*$/;
  return usernameRegex.test(username);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}
