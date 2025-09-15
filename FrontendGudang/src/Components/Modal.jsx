import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const ModalOnClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
        isOpen ? "visible bg-black/50" : "invisible bg-transparent"
      }`}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      <div
        onClick={ModalOnClick}
        className={`bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
