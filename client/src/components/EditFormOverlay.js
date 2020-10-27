import React from 'react';
import '../css/EditFormOverlay.css';

const EditFormOverlay = (props) => {
  return (
    <div 
      className="overlay-container"
      style={{display: props.showOverlay === true ? 'block' : 'none'}}>
      <h1>Edit {props.toEdit}</h1>
      <form onSubmit={e => e.preventDefault()}>
        <label>{props.toEdit} name: </label>
        <input 
          type="text" 
          value={props.formInputOneValue} 
          onChange={props.onFormInputOneChange} 
        />
        <button onClick={props.onFormSubmit}>Update</button>
      </form>
      <button onClick={props.closeOverlay}>Close</button>
    </div>
  );
};

export default EditFormOverlay; 