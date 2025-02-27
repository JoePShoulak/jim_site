import emailjs from "emailjs-com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const sendEmail = (emailParams, onSuccess, onError) => {
  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY)
    .then(response => {
      console.log("SUCCESS!", response.status, response.text);
      onSuccess(); // Call success callback
    })
    .catch(error => {
      console.error("FAILED...", error);
      onError(error); // Call error callback
    });
};

export { sendEmail };
