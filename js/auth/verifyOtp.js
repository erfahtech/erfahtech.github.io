// verifyOtp.js

function VerifyOTP() {
  // Get the email input value
  const emailInput = localStorage.getItem("sentEmail");

  // Get the OTP input value
  const otpInput = document.getElementById("otp").value;

  // Validate the email (you may want to add more validation)
  if (!isValidOTP(otpInput)) {
    // Display an error message
    Swal.fire({
      icon: "error",
      title: "Invalid OTP",
      text: "Silakan masukkan OTP yang valid. OTP terdiri dari 6 angka.",
    });
    return;
  }

  // Prepare the data to send in the request
  const data = {
    otp: otpInput,
    email: emailInput,
  };

  // Make a POST request to your API endpoint
  fetch("https://asia-southeast2-urse-project.cloudfunctions.net/urse-verifyotp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // Check if the request was successful (you may want to add more checks)
      if (response.ok) {
        // Store the email in localStorage
        localStorage.setItem("sentOTP", otpInput);

        // Display a success message
        Swal.fire({
          icon: "success",
          title: "Kode OTP Benar",
          text: "Kode OTP yang Anda masukkan benar. Silakan masukkan password baru Anda.",
        });

        // Redirect the user to the OTP verification page
        window.location.href = "resetpassword.html";
      } else {
        // Display an error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal verifykasi OTP. Silakan coba lagi.",
        });
      }
    })
    .catch((error) => {
      // Display an error message if there is a network issue
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Gagal verifykasi OTP. Silakan coba lagi.",
      });
    });
}

// Function to validate otp format
function isValidOTP(otp) {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
}

window.VerifyOTP = VerifyOTP;
