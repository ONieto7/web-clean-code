import React from 'react';
import './Button.css';

function Button({ children, onClick, type = "button", ...props }) {
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;