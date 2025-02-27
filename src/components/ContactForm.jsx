import { useState } from "react";
import Modal from "./Modal";
import { sendEmail } from "/src/scripts/sendEmail.js";

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false); // Track sending state
  const [errorMessage, setErrorMessage] = useState(""); // Store error messages

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSending(true); // Disable button

    const emailParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    sendEmail(
      emailParams,
      () => {
        console.log("✅ Email sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
        setIsSending(false); // Re-enable button
        setErrorMessage(""); // Clear any previous error
        onClose(); // Close modal after success
      },
      error => {
        console.error("❌ Email failed:", error);
        setIsSending(false); // Re-enable button
        // setErrorMessage(error.text);
        setErrorMessage("An error occurred. Please try again later.");
      }
    );
  };

  return (
    isOpen && (
      <Modal title="Contact Us" onClose={onClose}>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Subject:
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required>
              <option value="" disabled>
                Select a subject
              </option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <p className="error-message">{errorMessage ?? "no error"}</p>
          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>
      </Modal>
    )
  );
};

export default ContactForm;
