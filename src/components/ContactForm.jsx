import { useState, useEffect } from "react";
import Modal from "./Modal";
import { sendEmail } from "/src/scripts/sendEmail.js";

import {
  NameField,
  EmailField,
  DropdownField,
  MessageField,
} from "./FormFields";

const ContactForm = ({ isOpen, onClose, defaultSubject = "" }) => {
  const nullFormData = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(nullFormData);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // When the modal opens, set the default subject if provided
  useEffect(() => {
    if (isOpen) {
      setFormData(current => ({
        ...current,
        subject: defaultSubject, // Pre-fill subject if provided
      }));
    }
  }, [isOpen, defaultSubject]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSending(true);

    const emailParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    sendEmail(
      emailParams,
      () => {
        setFormData(nullFormData);
        setIsSending(false);
        setErrorMessage("");
        onClose();
      },
      _error => {
        setIsSending(false);
        setErrorMessage("An error occurred. Please try again later.");
      }
    );
  };

  const dropdownOptions = [
    { label: "Prayer Request" },
    { label: "General Inquiry" },
    { label: "Technical Support" },
    { label: "Feedback" },
    { label: "Other" },
  ];

  return (
    isOpen && (
      <Modal title="Contact Us" onClose={onClose}>
        <form onSubmit={handleSubmit} className="contact-form">
          <NameField value={formData.name} onChange={handleChange} />
          <EmailField value={formData.email} onChange={handleChange} />
          <DropdownField
            label="Subject"
            valueName="subject"
            value={formData.subject}
            onChange={handleChange}
            options={dropdownOptions}
          />
          <MessageField value={formData.message} onChange={handleChange} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>
      </Modal>
    )
  );
};

export default ContactForm;
