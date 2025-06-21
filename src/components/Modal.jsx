const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                {title && <h2 className="modal-title">{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Modal;