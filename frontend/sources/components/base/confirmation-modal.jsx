import React from "react";
import { useTranslation } from "../../contexts/localContext";

function ConfirmationModal({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  title,
  message, 
  confirmText, 
  cancelText,
  iconType = "warning" // warning, success, info, danger
}) {
  if (!isOpen) return null;

  const t = useTranslation();

  const getIcon = () => {
    switch (iconType) {
      case "success":
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#16a34a"/>
          </svg>
        );
      case "danger":
      case "warning":
      default:
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
            <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor"/>
            <path d="M12 7C11.4477 7 11 7.44772 11 8V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V8C13 7.44772 12.5523 7 12 7Z" fill="currentColor"/>
          </svg>
        );
    }
  };

  return (
    <div className="confirmation-modal-overlay" onClick={onCancel}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <div className={`confirmation-modal-icon ${iconType}`}>
          {getIcon()}
        </div>
        {title && <h3 className="confirmation-modal-title">{title}</h3>}
        <p className="confirmation-modal-message">{message}</p>
        <div className="confirmation-modal-buttons">
          <button className="confirmation-modal-btn cancel" onClick={onCancel}>
            {cancelText || t('cancel')}
          </button>
          <button className={`confirmation-modal-btn confirm ${iconType === 'success' ? 'green' : 'warning'}`} onClick={onConfirm}>
            {confirmText || t('yess')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
