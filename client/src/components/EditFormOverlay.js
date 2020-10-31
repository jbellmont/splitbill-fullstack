import React from 'react';
import '../css/EditFormOverlay.css';

const EditFormOverlay = (props) => {
  const nameCapitalized = props.toEdit.charAt(0).toUpperCase() + props.toEdit.slice(1);
  return (
    <div className="overlay" style={{display: props.showOverlay === true ? 'block' : 'none'}}>
    <div className="overlay-container">
      <h1>Edit {props.toEdit} name</h1>
      <form onSubmit={e => e.preventDefault()}>
        <label>{nameCapitalized} name: </label>
        <input 
          type="text" 
          value={props.formInputOneValue} 
          onChange={props.onFormInputOneChange}
          required
        />

        {props.toEdit === 'receipts' ?
        <div>

          <label>Receipt amount: </label>
          <input 
            type="text" 
            value={props.formInputTwoValue} 
            onChange={props.onFormInputTwoChange} 
            required
          />

          <label>Receipt category 
            <select value={props.formInputThreeValue} onChange={props.onFormInputThreeChange} required>
              <option>Alcohol</option>
              <option>Grocery</option>
              <option>Restaurant</option>
              <option>Ticket</option>
              <option>Transport</option>
            </select>
          </label>
        </div> : null
        }
        <br />
        <button onClick={props.onFormSubmit}><i class="far fa-save"></i> Update </button>
        <button onClick={props.closeOverlay}><i class="fas fa-times-circle"></i> Close</button>

      </form>
    </div>
    </div>
  );
};

export default EditFormOverlay; 