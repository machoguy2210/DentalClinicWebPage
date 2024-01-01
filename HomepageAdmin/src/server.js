// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dentalclinicdb'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


app.get('/api/appointments', (req, res) => {
  const query = 'SELECT * FROM appointment';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Results:', results);
      res.json(results);
    }
  });
});

app.get('/api/allnhasi', (req, res) => {
  const query = 'SELECT * FROM nhasi';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Results:', results);
      res.json(results);
    }
  });
});

// Định nghĩa API để thêm nha sĩ
app.post('/api/allnhasi', (req, res) => {
  const { MANS, TENNS, GIOITHIEU, SDT, DIACHI } = req.body;

  const sql = 'INSERT INTO nhasi (MANS, TENNS, GIOITHIEU, SDT, DIACHI) VALUES (?, ?, ?, ?, ?)';
  const values = [MANS, TENNS, GIOITHIEU, SDT, DIACHI];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Inserted new record:', result);
      res.status(200).send('Inserted new record');
    }
  });
});


// Dịch vụ
app.get('/api/alldichvu', (req, res) => {
  const query = 'SELECT * FROM service';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Results:', results);
      res.json(results);
    }
  });
});

// Thêm dịch vụ
app.post('/api/alldichvu', (req, res) => {
  const { MADV, TENDV, GIA, MOTA } = req.body;
  const sql = 'INSERT INTO service (MADV, TENDV, GIA, MOTA) VALUES (?, ?, ?, ?)';
  const values = [MADV, TENDV, GIA, MOTA];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Inserted new record:', result);
      res.status(200).send('Inserted new record');
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});