const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

require('dotenv').config();

// Start server
const app = express();
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// MySQL
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});


// *************************
// *** ACTIVITIES routes ***
// *************************

// CREATE - Post new activity
app.post('/activities/add', (req, res) => {
  const newActivity = {
    activity_name: `${req.body.activityName}`, 
    settled_status: 0,
  };
  const sql = 'INSERT INTO activities SET ?';
  db.query(sql, newActivity, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Activity added');
  })
});

// READ - Get ALL activities
app.get('/activities/all', (req, res) => {
  const sql = 'SELECT * FROM activities';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// UPDATE - Put activity
app.put('/activities/update/:id', (req, res) => {
  const updatedActivity = {
    activity_name: `${req.body.updatedActivityName}`,
    settled_status: `${req.body.updatedSettledStatus}`
  };
  const sql = `UPDATE activities SET ? WHERE activity_id = ${req.params.id}`;
  db.query(sql, updatedActivity, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Activity updated');
  });
});

// DELETE - Delete activity
app.delete('/activities/delete/:id', (req, res) => {
  const sql = `DELETE FROM activities WHERE activity_id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(sql);
    console.log(result);
    res.send('Activity deleted');
  });
});



// *************************
// *** FRIENDS routes ***
// *************************

// CREATE - Post new friend
app.post('/friends/add', (req, res) => {
  const newFriend = {
    friend_name: `${req.body.friendName}`, 
    activity_id: `${req.body.activityID}`, 
    settled_status: 0,
  };
  const sql = 'INSERT INTO friends SET ?';
  db.query(sql, newFriend, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Friend added');
  })
});

// READ - Get friends
app.get('/friends/get/:id', (req, res) => {
  const sql = `SELECT f.friend_id, f.friend_name, a.activity_id, a.activity_name, a.settled_status FROM friends as f INNER JOIN activities as a ON f.activity_id = a.activity_id WHERE a.activity_id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// UPDATE - Put friend
app.put('/friends/update/:id', (req, res) => {
  const updatedFriend = {
    friend_name: `${req.body.updatedFriendName}`,
    settled_status: `${req.body.updatedSettledStatus}`
  };
  const sql = `UPDATE friends SET ? WHERE friend_id = ${req.params.id}`;
  db.query(sql, updatedFriend, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Activity updated');
  });
});

// DELETE - Delete friend
app.delete('/friends/delete/:id', (req, res) => {
  const sql = `DELETE FROM friends WHERE friend_id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(sql);
    console.log(result);
    res.send('Friend deleted');
  });
});

// *************************
// *** RECEIPTS routes ***
// *************************

// CREATE - Post new receipt
app.post('/receipts/add', (req, res) => {
  const newReceipt = {
    receipt_amount: `${req.body.receiptAmount}`, 
    receipt_name: `${req.body.receiptName}`, 
    receipt_category: `${req.body.receiptCategory}`,
    friend_id: `${req.body.friendID}`,
    activity_id: `${req.body.activityID}`,
  };
  const sql = 'INSERT INTO receipts SET ?';
  db.query(sql, newReceipt, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Receipt added');
  })
});

// READ - Get receipts
app.get('/receipts/all', (req, res) => {
  const sql = 'SELECT * FROM receipts';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// UPDATE - Put receipt
app.put('/receipts/update/:id', (req, res) => {
  const updatedReceipt = {
    receipt_amount: `${req.body.receiptAmount}`, 
    receipt_name: `${req.body.receiptName}`, 
    receipt_category: `${req.body.receiptCategory}`,
    friend_id: `${req.body.friendID}`,
    activity_id: `${req.body.activityID}`,
  };
  const sql = `UPDATE receipts SET ? WHERE receipt_id = ${req.params.id}`;
  db.query(sql, updatedReceipt, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Receipt updated');
  });
});

// DELETE - Delete receipt
app.delete('/receipts/delete/:id', (req, res) => {
  const sql = `DELETE FROM receipts WHERE receipt_id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(sql);
    console.log(result);
    res.send('Receipt deleted');
  });
});



