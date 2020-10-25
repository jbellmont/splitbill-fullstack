import React from 'react';

const CreateForm = ({ onCreateSubmit, inputValue, buttonText, description, placeholderText, onChange }) => {
  return (
    <form onSubmit={onCreateSubmit} >
      <input type="text" placeholder={placeholderText} value={inputValue} onChange={onChange}/>
      <button>{buttonText}</button>
      <p>{description}</p>
    </form>
  );
};

export default CreateForm;