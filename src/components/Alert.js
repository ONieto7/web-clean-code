import React from 'react';
import './Alert.css';

function Alert({ type = 'info', children }) {
  return (
    <div className={`alert alert-${type}`}>
      {children}
    </div>
  );
}

export default Alert;