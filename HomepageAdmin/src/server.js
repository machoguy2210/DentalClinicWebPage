// server.js
const express = require('express');
const mysql = require('mysql');
const moment = require('moment');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  'Your Client ID',
  'Your Client Secret',
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: 'Your Refresh Token'
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      type: 'OAUTH2',
      user: 'binh2210test@gmail.com',
      clientId: 'Your Client ID',
      clientSecret: 'Your Client Secret',
      refreshToken: 'Your Refresh Token',
      accessToken: accessToken,
  }
});

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

app.get('/api/appointments/get/:NGAYKHAM', (req, res) => {
  const query = 'SELECT * FROM appointment where NGAYKHAM = ?';
  const { NGAYKHAM } = req.params;
  db.query(query, [NGAYKHAM] ,(err, results) => {
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

app.get('/api/appointments/transaction/:MAKH/:NGAYKHAM', (req, res) => {
  const query = 'UPDATE appointment SET KHOATHANHTOAN = 0 WHERE MAKH=? AND NGAYKHAM=?';
  const { MAKH, NGAYKHAM } = req.params;
  db.query(query, [MAKH, NGAYKHAM], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(MAKH, NGAYKHAM);
      console.log('SQL query successful');
      console.log('Results:', results);
      res.sendStatus(200);
    }
  });
});

app.get('/api/transactions', (req, res) => {
  const query = 'SELECT * FROM appointment WHERE NGAYKHAM = CURDATE() and KHOATHANHTOAN = 0';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('SQL query successful');
      const formattedResults = results.map((row) => {
        row.NGAYKHAM = moment(row.NGAYKHAM).format('YYYY-MM-DD');
        return row;
      });
      console.log('Results:', formattedResults);
      res.json(formattedResults);
    }
  });
});


app.delete('/api/appointments/:MAKH/:NGAYKHAM', (req, res) => {
  const query = 'DELETE FROM appointment WHERE MAKH=? AND NGAYKHAM=?';
  const { MAKH, NGAYKHAM } = req.params;
  db.query(query, [MAKH, NGAYKHAM], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(MAKH, NGAYKHAM);
      console.log('SQL query successful');
      console.log('Results:', results);
      res.sendStatus(200);
    }
  });
});

app.get('api/transactions/:MAKH/:NGAYKHAM', (req, res) => {
  const query = 'UPDATE appointment SET KHOATHANHTOAN = 2 WHERE MAKH=? AND NGAYKHAM=?';
  const { MAKH, NGAYKHAM } = req.params;
  db.query(query, [MAKH, NGAYKHAM], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(MAKH, NGAYKHAM);
      console.log('SQL query successful');
      console.log('Results:', results);
      res.sendStatus(200);
    }
  });
});

app.get('/api/appointments/edit/:MAKH/:NGAYKHAM/:HOTEN/:PHONE/:MADV', (req, res) => {
  const { MAKH, NGAYKHAM, HOTEN, PHONE, MADV } = req.params;
  const query = 'UPDATE appointment SET HOTEN=?, PHONE=?, MADV=? WHERE MAKH=? AND NGAYKHAM=?';
  db.query(query, [HOTEN, PHONE, MADV, MAKH, NGAYKHAM], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(MAKH, NGAYKHAM);
      console.log('SQL query successful');
      console.log('Results:', results);
      res.sendStatus(200);
    }
  });
});

app.post('/api/appointments', (req, res) => {
    const receivedData = req.body;
    receivedData.forEach(element => {
        const appointment = element.split('/');
        console.log(appointment[0], appointment[1], appointment[2]);
        const query1 = 'Select EMAIL from KHACHHANG where MAKH = ?';
        db.query(query1, [appointment[0]], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('SQL query successful');
                console.log('Results:', results);
                console.log(results[0].EMAIL);
                const mailOptions = {
                    from: 'binh2210test@gmail.com',
                    to: results[0].EMAIL,
                    subject: 'Nhắc lịch hẹn',
                    text: 'Bạn có lịch hẹn khám gói dịch vụ ' + appointment[2] + ' vào ngày ' + appointment[1] + '. Vui lòng đến đúng giờ.',
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
            }
        });  
    });
    res.json('Success');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});