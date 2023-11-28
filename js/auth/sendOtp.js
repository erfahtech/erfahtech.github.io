// sendOtp.js

function SendOTP() {
  // Get the email input value
  const emailInput = document.getElementById("email").value;

  // Validate the email (you may want to add more validation)
  if (!isValidEmail(emailInput)) {
    // Display an error message
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Silakan masukkan email yang valid.",
    });
    return;
  }

  // Prepare the data to send in the request
  const data = {
    email: emailInput,
  };

  // Make a POST request to your API endpoint
  fetch("https://asia-southeast2-urse-project.cloudfunctions.net/urse-sendotp", {
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
        localStorage.setItem("sentEmail", emailInput);

        // Display a success message
        Swal.fire({
          icon: "success",
          title: "OTP Terkirim",
          text: "Perikas WhatsApp Anda untuk melihat OTP.",
        });
      } else {
        // Display an error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal mengirim OTP. Silakan coba lagi.",
        });
      }
    })
    .catch((error) => {
      // Display an error message if there is a network issue
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Gagal mengirim OTP. Silakan coba lagi.",
      });
    });
}

// Function to validate email format (you may want to improve this)
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

window.SendOTP = SendOTP;
