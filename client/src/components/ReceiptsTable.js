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
            <th>Edit receipt</th>
            <th>Delete receipt</th>
          </tr>
        </thead>
        <tbody>
          {props.receiptsData.map((receipt, index) => {
            return (
              <tr data-id={receipt.receipt_id}>
                <td>{index + 1}</td>
                <td>{receipt.receipt_name}</td>
                <td>{receipt.receipt_category}</td>
                <td>£ {receipt.receipt_amount}</td>
                <td className="center"><button onClick={props.onEditReceiptOverlayClick}><i class="fas fa-edit"></i></button></td>
                <td className="center"><button onClick={props.onDeleteReceiptClick}><i class="fas fa-trash-alt"></i></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default ReceiptsTable;