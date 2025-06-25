import React from 'react';
import './Avatar.css';

function Avatar({ src, alt = 'Avatar', size = 60 }) {
  return (
    <img
      className="avatar"
      src={src}
      alt={alt}
      style={{ width: size, height: size }}
    />
  );
}

export default Avatar;