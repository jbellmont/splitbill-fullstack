import React from 'react';
import '../css/CreateForm.css';

const CreateForm = ({ onCreateSubmit, inputValue, buttonText, description, placeholderText, onChange }) => {
  return (
    <form className="create-form" onSubmit={onCreateSubmit} >
      <p>{description}</p>
      <input 
        type="text" 
        placeholder={placeholderText} 
        value={inputValue} 
        onChange={onChange}
        required
        maxLength="25"
      /> <br />
      <button>{buttonText}</button>
    </form>
  );
};

export default CreateForm;