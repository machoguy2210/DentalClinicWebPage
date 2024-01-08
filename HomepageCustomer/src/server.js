const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const moment = require('moment');
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

  app.get('/api/my-review/:MAKH', (req, res) => {
    const query = 'SELECT appointment.NGAYKHAM, appointment.KHUNGGIO, service.TENDV, nhasi.TENNS, danhgia_bacsi.SOSAONS, danhgia_bacsi.BINHLUANNS, danhgia_dichvu.SOSAODV, danhgia_dichvu.BINHLUANDV FROM appointment JOIN danhgia_bacsi ON (danhgia_bacsi.MAKH = appointment.MAKH AND danhgia_bacsi.NGAYKHAM = appointment.NGAYKHAM) JOIN danhgia_dichvu ON (danhgia_dichvu.MAKH = appointment.MAKH AND danhgia_dichvu.NGAYKHAM = appointment.NGAYKHAM) JOIN service ON appointment.MADV = service.MADV JOIN nhasi ON appointment.MANS = nhasi.MANS WHERE appointment.MAKH = 1';
    const { MAKH } = req.params;
    db.query(query, MAKH, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('SQL query successful');
        const formattedResults = results.map((row) => {
          row.NGAYKHAM = moment(row.NGAYKHAM).format('YYYY-MM-DD');
          return row;
        });
        res.json(formattedResults);
      }
    });
  });

  app.get('/api/my-review/:MAKH/:NGAYKHAM', (req, res) => {
    const query = 'SELECT appointment.NGAYKHAM, appointment.KHUNGGIO, service.TENDV, nhasi.TENNS, danhgia_bacsi.SOSAONS, danhgia_bacsi.BINHLUANNS, danhgia_dichvu.SOSAODV, danhgia_dichvu.BINHLUANDV FROM appointment JOIN danhgia_bacsi ON (danhgia_bacsi.MAKH = appointment.MAKH AND danhgia_bacsi.NGAYKHAM = appointment.NGAYKHAM) JOIN danhgia_dichvu ON (danhgia_dichvu.MAKH = appointment.MAKH AND danhgia_dichvu.NGAYKHAM = appointment.NGAYKHAM) JOIN service ON appointment.MADV = service.MADV JOIN nhasi ON appointment.MANS = nhasi.MANS WHERE appointment.MAKH = 1 AND appointment.NGAYKHAM=?';
    const { MAKH, NGAYKHAM } = req.params;
    db.query(query, [MAKH, NGAYKHAM], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('SQL query successful');
        const formattedResults = results.map((row) => {
          row.NGAYKHAM = moment(row.NGAYKHAM).format('YYYY-MM-DD');
          return row;
        });
        res.json(formattedResults);
      }
    });
  });

  app.get('/api/unreviewed-appointment/:MAKH', (req, res) => {
    const query = 'SELECT appointment.NGAYKHAM, appointment.KHUNGGIO, service.TENDV, nhasi.TENNS, danhgia_bacsi.SOSAONS, danhgia_bacsi.BINHLUANNS, danhgia_dichvu.SOSAODV, danhgia_dichvu.BINHLUANDV FROM appointment LEFT JOIN danhgia_bacsi ON danhgia_bacsi.MAKH = appointment.MAKH AND danhgia_bacsi.NGAYKHAM = appointment.NGAYKHAM LEFT JOIN danhgia_dichvu ON danhgia_dichvu.MAKH = appointment.MAKH AND danhgia_dichvu.NGAYKHAM = appointment.NGAYKHAM JOIN service ON appointment.MADV = service.MADV JOIN nhasi ON appointment.MANS = nhasi.MANS WHERE appointment.MAKH = 1 AND (danhgia_bacsi.SOSAONS IS NULL OR danhgia_dichvu.SOSAODV IS NULL) AND appointment.NGAYKHAM < CURDATE()';
    const { MAKH } = req.params;
    db.query(query, [MAKH], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('SQL query successful');
        const formattedResults = results.map((row) => {
          row.NGAYKHAM = moment(row.NGAYKHAM).format('YYYY-MM-DD');
          return row;
        });
        res.json(formattedResults);
      }
    });
  });

  app.get('/api/unreviewed-appointment/:MAKH/:NGAYKHAM', (req, res) => {
    const query = 'SELECT appointment.MAKH, appointment.NGAYKHAM, appointment.KHUNGGIO, service.TENDV, nhasi.TENNS, danhgia_bacsi.SOSAONS, danhgia_bacsi.BINHLUANNS, danhgia_dichvu.SOSAODV, danhgia_dichvu.BINHLUANDV FROM appointment LEFT JOIN danhgia_bacsi ON danhgia_bacsi.MAKH = appointment.MAKH AND danhgia_bacsi.NGAYKHAM = appointment.NGAYKHAM LEFT JOIN danhgia_dichvu ON danhgia_dichvu.MAKH = appointment.MAKH AND danhgia_dichvu.NGAYKHAM = appointment.NGAYKHAM JOIN service ON appointment.MADV = service.MADV JOIN nhasi ON appointment.MANS = nhasi.MANS WHERE appointment.MAKH = 1 AND appointment.NGAYKHAM = ? AND (danhgia_bacsi.SOSAONS IS NULL OR danhgia_dichvu.SOSAODV IS NULL) AND appointment.NGAYKHAM < CURDATE()';
    const {MAKH, NGAYKHAM} = req.params;
    db.query(query, [MAKH, NGAYKHAM], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('SQL query successful');
        const formattedResults = results.map((row) => {
          row.NGAYKHAM = moment(row.NGAYKHAM).format('YYYY-MM-DD');
          return row;
        });
        res.json(formattedResults);
      }
    });
  });

  app.post('/api/add-doctor-review', (req, res) => {
    const { MAKH, NGAYKHAM, SOSAONS, BINHLUANNS } = req.body;
    const sql = 'INSERT INTO danhgia_bacsi (MAKH, NGAYKHAM, SOSAONS, BINHLUANNS) VALUES (?, ?, ?, ?)';
    const values = [MAKH, NGAYKHAM, SOSAONS, BINHLUANNS];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(values);
        console.error('Error inserting into MySQL:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Inserted new record:', result);
        res.status(200).send('Inserted new record');
      }
    });
  });

  app.post('/api/add-service-review', (req, res) => {
    const { MAKH, NGAYKHAM, SOSAODV, BINHLUANDV } = req.body;
    const sql = 'INSERT INTO danhgia_dichvu (MAKH, NGAYKHAM, SOSAODV, BINHLUANDV) VALUES (?, ?, ?, ?)';
    const values = [MAKH, NGAYKHAM, SOSAODV, BINHLUANDV];
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
  