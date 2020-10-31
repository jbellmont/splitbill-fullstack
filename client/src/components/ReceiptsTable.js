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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.receiptsData.map((receipt, index) => {
            return (
              <tr data-id={receipt.receipt_id}>
                <td>{index + 1}</td>
                <td>{receipt.receipt_name}</td>
                <td>{receipt.receipt_category}</td>
                <td>{receipt.receipt_amount}</td>
                <td><button onClick={props.onEditReceiptOverlayClick}>Edit receipt</button></td>
                <td><button onClick={props.onDeleteReceiptClick}>Delete receipt</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default ReceiptsTable;