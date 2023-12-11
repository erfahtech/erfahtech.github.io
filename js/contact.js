import emailjs from 'emailjs-com';

emailjs.init("user_your_user_id"); // Ganti dengan User ID Anda dari Email.js

export const sendEmail = () => {
    const contactForm = document.getElementById("contactForm");

    emailjs.sendForm("service_your_service_id", "template_your_template_id", contactForm)
        .then(
            (response) => {
                console.log("Email sent successfully:", response);
            },
            (error) => {
                console.log("Email failed to send:", error);
            }
        );
};


