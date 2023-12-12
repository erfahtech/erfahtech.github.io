emailjs.init("vJyMKJAarSbg10iVb");

// Fungsi sendEmail Anda
const sendEmail = () => {
  const form = {
    namalengkap: document.getElementById("namalengkap").value,
    emailcontact: document.getElementById("emailcontact").value,
    nomorhp: document.getElementById("nomorhp").value,
    subject: document.getElementById("subject").value,
    pesan: document.getElementById("pesan").value,
  };

  emailjs.send("service_x7d8efw", "template_xk3ay8b", form)
    .then(
      async function (response) {
        await Swal.fire({
          icon: "success",
          title: response.message || "Email Berhasil Dikirimkan",
          showConfirmButton: true,
          timer: 3000,
        });
      },
      function (error) {
        console.log("Email gagal dikirim:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email Gagal Dikirimkan",
          timer: 3000,
        });
      }
    );
};

window.sendEmail = sendEmail;