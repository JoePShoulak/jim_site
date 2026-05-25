const Modal = ({
  title,
  children,
  onClose,
  className = "",
  showCloseButton = true,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${className}`.trim()}
        onClick={e => e.stopPropagation()}
      >
        {title && <h3>{title}</h3>}
        {children}
        {showCloseButton && <button onClick={onClose}>Close</button>}
      </div>
    </div>
  );
};

export default Modal;
