emailjs.init("vJyMKJAarSbg10iVb");

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
        console.log("Email sent successfully:", response);
      },
      function (error) {
        console.log("Email failed to send:", error);
      }
    );
}
window.sendEmail = sendEmail;