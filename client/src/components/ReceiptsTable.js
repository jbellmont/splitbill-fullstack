import React, { useState, useEffect } from 'react';

const ReceiptsTable = (props) => {

  console.log(props);
  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Receipt name</th>
            <th>Receipt category</th>
            <th>Receipt amount</th>
            <th>Delete receipt</th>
          </tr>
        </thead>
        <tbody>
          {props.receiptsData.map((receipt, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{receipt.receipt_name}</td>
                <td>{receipt.receipt_category}</td>
                <td>{receipt.receipt_amount}</td>
                <td data-id={receipt.receipt_id}><button onClick={props.onDeleteReceiptClick}>Delete receipt</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default ReceiptsTable;