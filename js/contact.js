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

  emailjs.send("service_tbpc7bn", "template_nqp29gs", form)
    .then(
      function (response) {
        console.log("Email berhasil dikirim:", response);
      },
      function (error) {
        console.log("Email gagal dikirim:", error);
      }
    );
};

window.sendEmail = sendEmail;