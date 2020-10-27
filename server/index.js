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

// READ - Get specific activity
app.get('/activities/get/:id', (req, res) => {
  const sql = `SELECT * FROM activities WHERE activity_id = ${req.params.id}`;
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
  const sql = `
  SELECT f.friend_id, f.friend_name, f.activity_id, a.activity_name, f.settled_status, SUM(r.receipt_amount) as total_paid
  FROM receipts as r
  RIGHT JOIN friends as f ON r.friend_id = f.friend_id
  INNER JOIN activities as a ON f.activity_id = a.activity_id
  WHERE f.activity_id = ${req.params.id}
  GROUP BY f.friend_id;
  `;
    db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// READ - the ActivityID + Friend Name of the active Friend
app.get('/friends/get/act/:id', (req, res) => {
  const sql = `SELECT friends.activity_id, friends.friend_name FROM friends INNER JOIN activities ON friends.activity_id = activities.activity_id WHERE friends.friend_id = ${req.params.id};`
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// READ - get the total amount spent for all Friends
app.get('/friends/get/spend/all', (req, res) => {
  const sql = `SELECT friend_id, SUM(receipt_amount) as total_paid FROM receipts GROUP BY friend_id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

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

// READ - Get specific receipts based on friend
app.get('/receipts/get/:id', (req, res) => {
  const sql = `SELECT * FROM receipts WHERE friend_id = ${req.params.id}`;
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
  const sql = `DELETE FROM receipts WHERE friend_id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(sql);
    console.log(result);
    res.send('Receipt deleted');
  });
});



