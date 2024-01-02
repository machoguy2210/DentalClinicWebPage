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

app.put('/api/alldichvu/:MADV', (req, res) => {
  // Trích xuất dữ liệu từ phần thân của yêu cầu
  let { TENDV, GIA, MOTA } = req.body;

  // Trích xuất MADV từ các tham số đường dẫn
  let MADV = req.params.MADV;
  // Truy vấn SQL để cập nhật bản ghi trong bảng 'service'
  const sql = 'UPDATE service SET TENDV = ?, GIA = ?, MOTA = ? WHERE MADV = ?';
  // Giá trị để cập nhật trong truy vấn SQL
  const values = [TENDV, GIA, MOTA, MADV];
  // Thực thi truy vấn sử dụng kết nối cơ sở dữ liệu
  db.query(sql, values, (err, result) => {
    if (err) {
      // Xử lý lỗi cơ sở dữ liệu
      console.error('Lỗi khi cập nhật bản ghi MySQL:', err);
      res.status(500).send('Lỗi Nội Server');
    } else {
      // Ghi log thành công và gửi phản hồi
      console.log('Bản ghi đã được cập nhật:', result);
      res.status(200).send('Bản ghi đã được cập nhật');
    }
  });
});
app.delete('/api/alldichvu/:MADV', (req, res) => {
  // Trích xuất MADV từ các tham số đường dẫn
  const MADV = req.params.MADV;

  // SQL query để xóa một bản ghi từ bảng 'service'
  const sql = 'DELETE FROM service WHERE MADV = ?';

  // Thực thi truy vấn sử dụng kết nối cơ sở dữ liệu
  db.query(sql, [MADV], (err, result) => {
    if (err) {
      // Xử lý lỗi cơ sở dữ liệu
      console.error('Lỗi khi xóa bản ghi MySQL:', err);
      res.status(500).send('Lỗi Nội Server');
    } else {
      // Log thành công và chuyển hướng người dùng sau khi xóa
      console.log('Bản ghi đã được xóa:', result);
      res.redirect('/danh-sach-dich-vu'); // Điều hướng đến một trang cụ thể
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});