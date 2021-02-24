import ReactDom from 'react-dom';
import React from 'react';
import './Modal.css';
const Modal = ({ isOpen, children, position }) => {
  const MODAL_STYLES = {
    alignItems: position ? 'flex-start' : 'center',
    scrollBehavior: 'smooth',
  };

  const root = document.querySelector('body');

  if (!isOpen) {
    root.style.overflow = 'visible';
    root.style.position = 'relative';
    return null;
  }
  root.style.width = '100vw';
  root.style.height = '100vh';
  root.style.overflow = 'hidden';
  root.style.position = 'fixed';

  return ReactDom.createPortal(
    <div style={MODAL_STYLES} className="base_modal">
      {children}
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
