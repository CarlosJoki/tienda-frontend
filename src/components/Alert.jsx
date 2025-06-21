import { useEffect } from 'react';

const Alert = ({ message, type, onClose }) => {
    if (!message) return null;

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // La alerta se cierra automáticamente después de 3 segundos

        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className={`alert alert-${type}`}>
            {message}
            <button onClick={onClose} className="close-btn">&times;</button>
        </div>
    );
};

export default Alert;