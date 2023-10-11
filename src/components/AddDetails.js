import React, { useState } from 'react';

const AddForm = ({ onSubmit, buttonText }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="action-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default AddForm;
