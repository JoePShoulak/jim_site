import { useState } from "react";
import Modal from "./Modal";

const ContactForm = ({ isOpen, onClose }) => {
  const nullState = { name: "", email: "", subject: "", message: "" };

  const [formData, setFormData] = useState(nullState);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted! Check console for details.");
    setFormData(nullState);
    onClose();
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
          <button type="submit">Send</button>
        </form>
      </Modal>
    )
  );
};

export default ContactForm;
