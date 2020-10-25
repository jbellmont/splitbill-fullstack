import React, { useEffect, useState } from 'react';
import AddReceiptForm from './AddReceiptForm';
import ReceiptsTable from './ReceiptsTable';
import '../css/Global.css';

const Receipts = () => {
  const [receiptsData, setReceiptsData] = useState([]);
  const currentFriendID = window.location.pathname.split('/')[2]; 
  const [receiptsLoading, setReceiptsLoading] = useState(true);
  const [receiptsButtonClicked, setReceiptsButtonClicked] = useState(true);
  const [currentActivityID, setCurrentActivityID] = useState(0);
  const [currentFriendName, setCurrentFriendName] = useState('');

  // Get ActivityID for current Friend
  useEffect(() => {
    fetch(`http://localhost:5000/friends/get/act/${currentFriendID}`)
    .then(response => response.json())
    .then(response => {
      setCurrentActivityID(Number(response[0].activity_id));
      setCurrentFriendName(response[0].friend_name);
    })
    .catch(error => console.log(error))
  }, []);

  // Get receipts for the Friend
  useEffect(() => {
    fetch(`http://localhost:5000/receipts/get/${currentFriendID}`)
    .then(response => response.json())
    .then(response => {
      setReceiptsData(response);
      setReceiptsLoading(false);
    })
    .catch(error => console.log(error))
  }, [receiptsButtonClicked]);


  // Store value of add Receipt form inputs
  const [inputReceiptName, setInputReceiptName] = useState('');
  const [inputReceiptAmount, setInputReceiptAmount] = useState('');
  const [inputReceiptCategory, setInputReceiptCategory] = useState('Alcohol');

  // Create new receipt
  const onCreateReceiptSubmit = (e) => {
    // Creates a new Friend in the MySQL data
    e.preventDefault();
    // Request body
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        receiptAmount: inputReceiptAmount,
        receiptName: inputReceiptName,
        receiptCategory: inputReceiptCategory,
        friendID: currentFriendID,
        activityID: currentActivityID
      })
    };

    // API call
    fetch('http://localhost:5000/receipts/add', options)
      .then(response => {
        console.log('Creating receipt response status: ', response.status);
        setReceiptsButtonClicked(!receiptsButtonClicked);
      })
      .catch(err => console.log(err));
  };


  // Delete specific Receipt
  const onDeleteReceiptClick = (e) => {
    const currentReceiptID = e.target.parentNode.dataset.id;
    console.log(currentReceiptID);
    fetch(`http://localhost:5000/receipts/delete/${currentReceiptID}`, { method: "DELETE" })
      .then(response => {
        console.log(response.status);
        console.log(`ID ${currentReceiptID} successfully deleted`);
        setReceiptsButtonClicked(!receiptsButtonClicked);
      })
      .catch(error => console.log(error));
  };



  return (
    <div>

      {receiptsLoading ?
        <div><i className="fas fa-spinner spinner"></i> Loading</div> :
        <div>
          <h2>Add receipt for {currentFriendName}</h2>
          <AddReceiptForm 
            inputReceiptName={inputReceiptName}
            setInputReceiptName={setInputReceiptName}
            inputReceiptAmount={inputReceiptAmount}
            setInputReceiptAmount={setInputReceiptAmount}
            inputReceiptCategory={inputReceiptCategory}
            setInputReceiptCategory={setInputReceiptCategory}
            onCreateReceiptSubmit={onCreateReceiptSubmit}
          />
          <ReceiptsTable 
            receiptsData={receiptsData}
            onDeleteReceiptClick={onDeleteReceiptClick}
          />
        </div>
      }
    
    </div>
  );
};

export default Receipts;