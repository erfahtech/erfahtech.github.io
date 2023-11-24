// import { getValue } from "https://jscroot.github.io/element/croot.js";

// const postSignUp = async () => {
//     const email = getValue("emailsignup");
//     const phonenumber = getValue("phonesignup");
//     const username = getValue("usernamesignup");
//     const password = getValue("passwordsignup");
//     const loadingElement = document.getElementById("loading");

//     loadingElement.style.display = "block";

//     // Validasi input
//     if (!validateEmail(email) || !validatePhoneNumber(phonenumber) || !validateUsername(username) || !validatePassword(password)) {
//         Swal.fire({
//             icon: "error",
//             title: "Signup Failed",
//             text: "Please fill in all fields with valid data.",
//         });

//         loadingElement.style.display = "none";
//         return;
//     }

//     const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-signup";
//     const datainjson = {
//         email,
//         phonenumber,
//         username,
//         password,
//     };

//     try {
//         const response = await fetch(target_url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(datainjson),
//         });

//         const result = await response.json();
//         responseData(result);
//     } catch (error) {
//         console.error("Error:", error);
//     } finally {
//         loadingElement.style.display = "none";
//     }
// };

// const responseData = (result) => {
//     if (result.status === true) {
//         Swal.fire({
//             icon: "success",
//             title: "SignUp Successful",
//             text: "You have successfully signed up.",
//         }).then((result) => {
//             if (result.isConfirmed || result.isDismissed) {
//                 window.location.href = "login.html";
//             }
//         });
//     } else {
//         Swal.fire({
//             icon: "error",
//             title: "Signup Failed",
//             text: result.message,
//         });
//     }
// };

import { getValue } from "https://jscroot.github.io/element/croot.js";

const postSignUp = async () => {
    const email = getValue("emailsignup");
    const phonenumber = getValue("phonesignup");
    const username = getValue("usernamesignup");
    const password = getValue("passwordsignup");
    const loadingElement = document.getElementById("loading");

    loadingElement.style.display = "block";

    // Validasi input
    if (!validateEmail(email) || !validatePhoneNumber(phonenumber) || !validateUsername(username) || !validatePassword(password)) {
        Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: "Please fill in all fields with valid data.",
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

    try {
        const response = await fetch(target_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datainjson),
        });

        const result = await response.json();
        responseData(result);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        loadingElement.style.display = "none";
    }
};

const responseData = (result) => {
    if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "SignUp Successful",
            text: "You have successfully signed up.",
        }).then((result) => {
            if (result.value) {
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

// Validasi email
const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

// Validasi nomor telepon
const validatePhoneNumber = (phonenumber) => {
    // Remove non-digit characters from the phone number
    const cleanedPhoneNumber = phonenumber.replace(/\D/g, '');

    // Validate the cleaned phone number
    const regex = /^\d+$/;
    return regex.test(cleanedPhoneNumber) && cleanedPhoneNumber.length >= 8 && cleanedPhoneNumber.length <= 13;
};

// Validasi username
const validateUsername = (username) => {
    return username.length >= 2;
};

// Validasi password
const validatePassword = (password) => {
    // Pastikan panjang password minimal 8 karakter
    if (password.length < 8) {
        return false;
    }

    // Pastikan ada setidaknya satu huruf dan satu angka dalam password
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    return hasLetter && hasNumber;
};

window.postSignUp = postSignUp;


//toggle password
const passwordFunc = () => {
    const x = document.getElementById("passwordsignup");
    const parent = x.parentNode;

    x.type = x.type === "password" ? "text" : "password";
    parent.classList.toggle("show", x.type === "text");
};

window.passwordFunc = passwordFunc;





