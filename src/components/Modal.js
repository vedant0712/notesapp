import React from "react";

function Modal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-container">
      <div className="modal">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-button confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="modal-button cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
