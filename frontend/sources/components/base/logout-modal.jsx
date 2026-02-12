import React from "react";
import { useTranslation } from "../../contexts/localContext";

function LogoutModal({ isOpen, onConfirm, onCancel, message, confirmText, cancelText }) {
  if (!isOpen) return null;

  const t = useTranslation();

  return (
    <div className="logout-modal-overlay" onClick={onCancel}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="logout-modal-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
            <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor"/>
            <path d="M12 7C11.4477 7 11 7.44772 11 8V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V8C13 7.44772 12.5523 7 12 7Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="logout-modal-message">{message}</p>
        <div className="logout-modal-buttons">
          <button className="logout-modal-btn cancel" onClick={onCancel}>
            {cancelText || t('cancel')}
          </button>
          <button className="logout-modal-btn confirm" onClick={onConfirm}>
            {confirmText || t('yess')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
