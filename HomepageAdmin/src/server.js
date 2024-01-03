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
//sua nha si
app.put('/api/allnhasi/:MANS', (req, res) => {
  // Trích xuất dữ liệu từ phần thân của yêu cầu
  const { TENNS, GIOITHIEU, SDT, DIACHI } = req.body;

  // Trích xuất MADV từ các tham số đường dẫn
  const MANS = req.params.MANS;
  // Truy vấn SQL để cập nhật bản ghi trong bảng 'service'
  const sql = 'UPDATE nhasi SET TENNS = ?, GIOITHIEU = ?, SDT = ? , DIACHI = ? WHERE MANS = ?';
  // Giá trị để cập nhật trong truy vấn SQL
  const values = [TENNS, GIOITHIEU, SDT, DIACHI, MANS];
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
// delete nha si
app.delete('/api/allnhasi/:MANS', (req, res) => {
  // Trích xuất MADV từ các tham số đường dẫn
  const MANS = req.params.MANS;

  // SQL query để xóa một bản ghi từ bảng 'service'
  const sql = 'DELETE FROM nhasi WHERE MANS = ?';

  // Thực thi truy vấn sử dụng kết nối cơ sở dữ liệu
  db.query(sql, [MANS], (err, result) => {
    if (err) {
      // Xử lý lỗi cơ sở dữ liệu
      console.error('Lỗi khi xóa bản ghi MySQL:', err);
      res.status(500).send('Lỗi Nội Server');
    } else {
      // Log thành công và chuyển hướng người dùng sau khi xóa
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
// delete dịch vụ
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
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});