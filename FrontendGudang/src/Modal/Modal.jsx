import React, { useState, useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children, transitionDuration = 300 }) => {
  const [rendered, setRendered] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      setVisible(false);
      setTimeout(() => setVisible(true), 10);
    } else if (rendered) {
      setVisible(false);
      timeoutRef.current = setTimeout(() => {
        setRendered(false);
        if (onClose) onClose();
      }, transitionDuration);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [isOpen, rendered, transitionDuration, onClose]);

  if (!rendered) return null;

  const handleOverlayClick = () => {
    setVisible(false);
    timeoutRef.current = setTimeout(() => {
      setRendered(false);
      if (onClose) onClose();
    }, transitionDuration);
  };

  const ModalOnClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
        visible ? "visible bg-black/50" : "invisible bg-transparent"
      }`}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div
        onClick={ModalOnClick}
        className={`bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md transform transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          onClick={handleOverlayClick}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
