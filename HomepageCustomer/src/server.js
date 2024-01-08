const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const port = 3000;

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

  // dich vu
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



  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  