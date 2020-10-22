import React from 'react';
import { useState } from 'react';
import '../css/Global.css';

const Receipts = () => {

  const [receipts, setReceipts] = useState([]);

  return (
    <div>

      {receipts.length === 0 ?
        <div><i className="fas fa-spinner spinner"></i> Loading</div> :
        <div>placeholder</div>
      }
    
    </div>
  );
};

export default Receipts;