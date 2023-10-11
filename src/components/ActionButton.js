import React from 'react';

const ActionButton = ({ label, onClick }) => (
  <button className="action-button" onClick={onClick}>
    {label}
  </button>
);

export default ActionButton;
