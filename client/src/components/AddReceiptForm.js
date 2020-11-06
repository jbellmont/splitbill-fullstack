import React from 'react';
import '../css/AddReceiptForm.css';

const AddReceiptForm = ({ inputReceiptName, setInputReceiptName, inputReceiptAmount, setInputReceiptAmount, inputReceiptCategory, setInputReceiptCategory, onCreateReceiptSubmit }) => {
  return (
    <form className="add-receipt-form">
      <label>Receipt name <br /> <input type="text" value={inputReceiptName} onChange={e => setInputReceiptName(e.target.value)} required /></label> <br />
      <label>Receipt amount <br /> <input type="number" value={inputReceiptAmount} onChange={e => setInputReceiptAmount(e.target.value)} required /></label> <br />
      <label>Receipt category <br />
        <select value={inputReceiptCategory} onChange={e => setInputReceiptCategory(e.target.value)} required>
          <option>Alcohol</option>
          <option>Grocery</option>
          <option>Restaurant</option>
          <option>Ticket</option>
          <option>Transport</option>
        </select>
      </label> <br />
      <button onClick={onCreateReceiptSubmit}>Add receipt</button>

    </form>
  );
};

export default AddReceiptForm;