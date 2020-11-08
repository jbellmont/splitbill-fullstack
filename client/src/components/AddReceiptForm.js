import React, { useState } from 'react';
import Dropdown from './Dropdown';
import '../css/AddReceiptForm.css';

const AddReceiptForm = ({ inputReceiptName, setInputReceiptName, inputReceiptAmount, setInputReceiptAmount, inputReceiptCategory, setInputReceiptCategory, onCreateReceiptSubmit }) => {
  const [categoryData, setCategoryData] = useState(['activity', 'alcohol', 'grocery', 'other', 'restaurant', 'ticket', 'transport']);
  const [listOpen, setListOpen] = useState(false);
  const toggleList = () => setListOpen(!listOpen);
  const [dropdownValue, setDropdownValue] = useState('');
  const onDropdownChange = (e) => {
    setDropdownValue((e.target.innerText));
    setListOpen(!listOpen);
    setCategoryDDHeaderValue(e.target.innerText);
    setInputReceiptCategory(e.target.innerText);
  };

  const [categoryDDheaderValue, setCategoryDDHeaderValue] = useState('Select category');

  return (
    <form className="add-receipt-form">
      <label>Receipt name <br /> <input type="text" value={inputReceiptName} onChange={e => setInputReceiptName(e.target.value)} required /></label> <br />
      <label>Receipt amount <br /> <input type="number" value={inputReceiptAmount} onChange={e => setInputReceiptAmount(e.target.value)} required /></label> <br />
      <label>Receipt category <br />

      <Dropdown 
        header={categoryDDheaderValue}
        data={categoryData}
        type='categories'
        onDropdownChange={onDropdownChange}
        toggleList={toggleList}
        listOpen={listOpen}
      />

      </label> <br />
      <button onClick={onCreateReceiptSubmit}>Add receipt</button>

    </form>
  );
};

export default AddReceiptForm;