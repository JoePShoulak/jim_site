import emailjs from "emailjs-com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const requiredConfig = {
  VITE_EMAILJS_SERVICE_ID: SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID: TEMPLATE_ID,
  VITE_EMAILJS_PUBLIC_KEY: PUBLIC_KEY,
};

const missingConfig = Object.entries(requiredConfig)
  .filter(([, value]) => !value)
  .map(([name]) => name);

const sendEmail = (emailParams, onSuccess, onError) => {
  if (missingConfig.length > 0) {
    const error = new Error(
      `EmailJS is missing required config: ${missingConfig.join(", ")}`
    );
    onError(error);
    return Promise.resolve();
  }

  return emailjs
    .send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY)
    .then(onSuccess)
    .catch(onError);
};

export { sendEmail };
