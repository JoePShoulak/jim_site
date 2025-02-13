/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Don't render if not open

  const handleOutsideClick = event => {
    if (event.target.id === "modal-background") {
      onClose();
    }
  };

  return (
    <div
      id="modal-background"
      className="modal-background"
      onClick={handleOutsideClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        <div className="modal-body">{children}</div> {/* Accepts any content */}
        <button onClick={onClose} className="modal-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
