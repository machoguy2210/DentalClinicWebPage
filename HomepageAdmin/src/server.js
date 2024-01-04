// server.js
const express = require('express');
const mysql = require('mysql');
const moment = require('moment');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const port = 3000;

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: 'YOUR_REFRESH_TOKEN'
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      type: 'OAUTH2',
      user: 'binh2210test@gmail.com',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      refreshToken: 'YOUR_REFRESH_TOKEN',
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
app.get('/api/appointments/get/:NGAYKHAM/:MANS', (req, res) => {
  const query = 'SELECT KHUNGGIO FROM appointment where NGAYKHAM = ? and MANS = ?';
  const { NGAYKHAM, MANS } = req.params;
  db.query(query, [NGAYKHAM, MANS] ,(err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('SQL query successful');
      res.json(results);
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
//sua nha si
app.put('/api/allnhasi/:MANS', (req, res) => {
  // Trích xuất dữ liệu từ phần thân của yêu cầu
  const { TENNS, GIOITHIEU, SDT, DIACHI } = req.body;

  const MANS = req.params.MANS;
  const sql = 'UPDATE nhasi SET TENNS = ?, GIOITHIEU = ?, SDT = ? , DIACHI = ? WHERE MANS = ?';
  const values = [TENNS, GIOITHIEU, SDT, DIACHI, MANS];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật bản ghi MySQL:', err);
      res.status(500).send('Lỗi Nội Server');
    } else {
      console.log('Bản ghi đã được cập nhật:', result);
      res.status(200).send('Bản ghi đã được cập nhật');
    }
  });
});
// delete nha si
app.delete('/api/allnhasi/:MANS', (req, res) => {
  // Trích xuất MADV từ các tham số đường dẫn
  const MANS = req.params.MANS;

  const sql = 'DELETE FROM nhasi WHERE MANS = ?';

  db.query(sql, [MANS], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa bản ghi MySQL:', err);
      res.status(500).send('Lỗi Nội Server');
    } else {
      console.log('Bản ghi đã được xóa:', result);
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

// update dich vu
app.put('/api/alldichvu/:MADV', (req, res) => {
  // Trích xuất dữ liệu từ phần thân của yêu cầu
  const { TENDV, GIA, MOTA } = req.body;

  // Trích xuất MADV từ các tham số đường dẫn
  const MADV = req.params.MADV;
  const sql = 'UPDATE service SET TENDV = ?, GIA = ?, MOTA = ? WHERE MADV = ?';
  const values = [TENDV, GIA, MOTA, MADV];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật bản ghi MySQL:', err);
      res.status(500).send('Lỗi Nội Server');
    } else {
      console.log('Bản ghi đã được cập nhật:', result);
      res.status(200).send('Bản ghi đã được cập nhật');
    }
  });
});
// delete dịch vụ
app.delete('/api/alldichvu/:MADV', (req, res) => {
  const MADV = req.params.MADV;
  const sql = 'DELETE FROM service WHERE MADV = ?';
  db.query(sql, [MADV], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa bản ghi MySQL:', err);
      res.status(500).send('Lỗi Nội Server');
    } else {
      console.log('Bản ghi đã được xóa:', result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});