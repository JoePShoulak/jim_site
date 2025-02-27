import emailjs from "emailjs-com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const sendEmail = emailParams => {
  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY) // Ensure PUBLIC_KEY is passed
    .then(response => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Email sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
      onClose();
    })
    .catch(error => {
      console.error("FAILED...", error);
      alert("Failed to send email.");
    });
};

export { sendEmail };
