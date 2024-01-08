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
  '24544262210-fd1qv4jqnhrnfriijjp25lc2rl9kprgp.apps.googleusercontent.com',
  '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',
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: '1//04RlBTFULbEobCgYIARAAGAQSNwF-L9IrX76khIzigOK_UENkm0y5RTZlcHHXel-qf06htkTGhQesyfyyVwah60Vh75jJXcKsz6A'
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAUTH2',
    user: 'binh2210test@gmail.com',
    clientId: '24544262210-fd1qv4jqnhrnfriijjp25lc2rl9kprgp.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//04RlBTFULbEobCgYIARAAGAQSNwF-L9IrX76khIzigOK_UENkm0y5RTZlcHHXel-qf06htkTGhQesyfyyVwah60Vh75jJXcKsz6A',
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
  db.query(query, [NGAYKHAM], (err, results) => {
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
  db.query(query, [NGAYKHAM, MANS], (err, results) => {
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

// search nha si
app.get('/api/allnhasi/search', (req, res) => {
  const searchQuery = req.query.query;
  const query = 'SELECT * FROM nhasi WHERE TENNS LIKE ? OR GIOITHIEU LIKE ? OR SDT LIKE ? OR DIACHI LIKE ?';

  db.query(query, [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.status(200).json(results);
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

// * API endpoint để lấy thông tin cuộc hẹn
app.get('/appointments', (req, res) => {
  const query = 'SELECT * FROM appointment,khachhang,nhasi,service WHERE appointment.MAKH=khachhang.MAKH AND appointment.MANS=nhasi.MANS AND service.MADV=appointment.MADV ;';

  db.query(query, [MAKH], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.status(200).json(results);
    }
  });
});
app.get('/appointments/:MAKH', (req, res) => {
  const MAKH = req.params.MAKH;

  const query = `
    SELECT *
    FROM appointment
    INNER JOIN khachhang ON appointment.MAKH = khachhang.MAKH
    INNER JOIN nhasi ON appointment.MANS = nhasi.MANS
    INNER JOIN service ON appointment.MADV = service.MADV
    WHERE appointment.MAKH = ?`;

  db.query(query, [MAKH], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.status(200).json(results);
    }
  });
});

// * API endpoint để xóa lịch hẹn dựa trên MAKH và NGAYKhAM
app.delete('/appointments/:MAKH/:NGAYKhAM', (req, res) => {
  const customerId = parseInt(req.params.MAKH);
  const appointmentDate = req.params.NGAYKhAM;

  // Kiểm tra xem các tham số bắt buộc đã được cung cấp chưa
  if (!customerId || !appointmentDate) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Xóa lịch hẹn dựa trên MAKH và NGAYKhAM
  const query = 'DELETE FROM appointment WHERE MAKH = ? AND NGAYKhAM = ?;';

  db.query(query, [customerId, appointmentDate], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa lịch hẹn:', err);
      res.status(500).json({ error: 'Lỗi khi xóa lịch hẹn' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Không tìm thấy lịch hẹn để xóa' });
      } else {
        res.status(200).json({ message: `Đã xóa lịch hẹn cho khách hàng có ID ${customerId} vào ngày ${appointmentDate}` });
      }
    }
  });
});
// * API chỉnh sửa thông tin cuộc hẹn
app.put('/appointments/:MAKH/:NGAYKhAM', (req, res) => {
  const customerId = parseInt(req.params.MAKH);
  const appointmentDate = req.params.NGAYKhAM;

  // Kiểm tra xem req.body có tồn tại không và có chứa các trường cần thiết không
  if (!req.body || !req.body.KHUNGGIO || !req.body.GHICHU) {
    return res.status(400).json({ error: 'Thiếu thông tin cần thiết trong body request' });
  }

  const { KHUNGGIO, GHICHU } = req.body;

  // Kiểm tra xem các tham số bắt buộc đã được cung cấp chưa
  if (!KHUNGGIO || !GHICHU) {
    return res.status(400).json({ error: 'Thiếu tham số bắt buộc' });
  }

  // Cập nhật thông tin lịch khám trong cơ sở dữ liệu
  const query = `
  UPDATE appointment
  SET KHUNGGIO = ?, GHICHU = ?
  WHERE MAKH = ? AND NGAYKhAM = ?;
`;

  db.query(query, [KHUNGGIO, GHICHU, customerId, appointmentDate], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật thông tin lịch khám:', err);
      return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin lịch khám' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Không tìm thấy lịch khám cho khách hàng có ID ${customerId} vào ngày ${appointmentDate}` });
    }

    res.status(200).json({ message: `Đã cập nhật lịch khám cho khách hàng có ID ${customerId} vào ngày ${appointmentDate}` });
  });
});



///////////////////////////////////////////////////////////////////////////////////////////////////

// API Employee

//////////////////////////////////////////////////////////////////////////////////////////////////

// API endpoint để lấy toàn bộ thông tin nhân viên
app.get('/employees', (req, res) => {
  const query = 'SELECT * FROM nhanvien;';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.status(200).json(results);
    }
  });
});



// API endpoint để thêm nhân viên mới
app.post('/employees', (req, res) => {
  const { HOTEN, EMAIL, SDT, GIOITINH, DIACHI, NGAYSINH, PASSWORD } = req.body;

  // Kiểm tra xem các tham số bắt buộc đã được cung cấp chưa
  if (!HOTEN || !EMAIL || !SDT || !GIOITINH || !DIACHI || !NGAYSINH || !PASSWORD) {
    return res.status(400).json({ error: 'Thiếu tham số bắt buộc' });
  }

  // Thêm nhân viên mới vào cơ sở dữ liệu
  const query = `
    INSERT INTO nhanvien (HOTEN, EMAIL, SDT, GIOITINH, DIACHI, NGAYSINH, PASSWORD)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  db.query(query, [HOTEN, EMAIL, SDT, GIOITINH, DIACHI, NGAYSINH, PASSWORD], (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm nhân viên mới:', err);
      return res.status(500).json({ error: 'Lỗi khi thêm nhân viên mới' });
    }

    res.status(201).json({ message: 'Đã thêm nhân viên mới thành công' });
  });
});



// API endpoint để xóa nhân viên dựa trên ID
app.delete('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);

  // Xóa nhân viên có ID tương ứng
  const query = 'DELETE FROM nhanvien WHERE MANV = ?;';

  db.query(query, [employeeId], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa nhân viên:', err);
      res.status(500).json({ error: 'Lỗi khi xóa nhân viên' });
    } else {
      res.status(200).json({ message: `Đã xóa nhân viên có ID ${employeeId}` });
    }
  });
});


// API endpoint để chỉnh sửa thông tin nhân viên
app.put('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);

  // Kiểm tra xem req.body có tồn tại và có chứa các trường cần thiết không
  const { HOTEN, EMAIL, SDT, GIOITINH, DIACHI, NGAYSINH, PASSWORD } = req.body;
  if (!HOTEN || !EMAIL || !SDT || !GIOITINH || !DIACHI || !NGAYSINH || !PASSWORD) {
    return res.status(400).json({ error: 'Thiếu thông tin cần thiết trong body request' });
  }

  // Cập nhật thông tin nhân viên trong cơ sở dữ liệu
  const query = `
  UPDATE nhanvien
  SET HOTEN = ?, EMAIL = ?, SDT = ?, GIOITINH = ?, DIACHI = ?, NGAYSINH = ?, PASSWORD = ?
  WHERE MANV = ?;
`;

  db.query(query, [HOTEN, EMAIL, SDT, GIOITINH, DIACHI, NGAYSINH, PASSWORD, employeeId], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật thông tin nhân viên:', err);
      return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin nhân viên' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Không tìm thấy nhân viên có ID ${employeeId}` });
    }

    res.status(200).json({ message: `Đã cập nhật nhân viên có ID ${employeeId}` });
  });
});




// API endpoint để thêm mới nhân viên
app.post('/employees', (req, res) => {
  // Kiểm tra xem req.body có tồn tại và có chứa các trường cần thiết không
  const { HOTEN, EMAIL, SDT, GIOITINH, DIACHI, NGAYSINH, PASSWORD } = req.body;
  if (!HOTEN || !EMAIL || !SDT || !GIOITINH || !DIACHI || !NGAYSINH || !PASSWORD) {
    return res.status(400).json({ error: 'Thiếu thông tin cần thiết trong body request' });
  }

  // Thêm mới nhân viên vào cơ sở dữ liệu
  const query = `
  INSERT INTO nhanvien (HOTEN, EMAIL, SDT, GIOITINH, DIACHI, NGAYSINH, PASSWORD)
  VALUES (?, ?, ?, ?, ?, ?, ?);
`;

  db.query(query, [HOTEN, EMAIL, SDT, GIOITINH, DIACHI, NGAYSINH, PASSWORD], (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm mới nhân viên:', err);
      return res.status(500).json({ error: 'Lỗi khi thêm mới nhân viên' });
    }

    res.status(201).json({ message: 'Đã thêm mới nhân viên thành công' });
  });
});


//////////////////////////////////////////////////////////////////
// API customer
//////////////////////////////////////////////////////////////////


// API endpoint để xóa nhân viên dựa trên ID
app.delete('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);


  const query = 'DELETE FROM khachhang WHERE MAKH = ?;';

  db.query(query, [customerId], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa nhân viên:', err);
      res.status(500).json({ error: 'Lỗi khi xóa nhân viên' });
    } else {
      res.status(200).json({ message: `Đã xóa nhân viên có ID ${customerId}` });
    }
  });
});


app.get('/customers', (req, res) => {
  const query = 'SELECT * FROM khachhang;';
  db.query(query, (err, results) => {
    res.status(200).json(results);
  })
});

app.get('/customers/:email', (req, res) => {
  const { email } = req.params;
  const query = 'SELECT * FROM KHACHHANG WHERE EMAIL = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    else {
      if (results.length > 0) {
        res.status(200).json(results);
      }
      else res.status(404).json({ message: 'Not Found' });
    }
  });
});

app.post(`/register`, (req, res) => {
 const {HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH} = req.body;
 console.log(req);
res.json("ok");
  /*
  const query = 'INSERT INTO KHACHHANG (HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH], (err, result) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json('Inserted new record');
    }
  });
  */
});
  


app.put('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const { HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH, TICHDIEM } = req.body;

  // Kiểm tra xem các trường cần thiết có được cung cấp hay không
  // if (!HOTEN || !EMAIL || !PASSWORD || !SDT || !GIOITINH || !DIACHI || !NGAYSINH || !TICHDIEM) {
  //     return res.status(400).json({ error: 'Thiếu thông tin cần thiết trong yêu cầu' });
  // }

  const updateQuery = `
      UPDATE khachhang
      SET HOTEN = ?, EMAIL = ?, PASSWORD = ?, SDT = ?, GIOITINH = ?, DIACHI = ?, NGAYSINH = ?, TICHDIEM = ?
      WHERE MAKH = ?;
  `;

  // Thực hiện truy vấn cơ sở dữ liệu để cập nhật thông tin khách hàng
  db.query(updateQuery, [HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH, TICHDIEM, customerId], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật thông tin khách hàng:', err);
      return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin khách hàng' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Không tìm thấy khách hàng có ID ${customerId}` });
    }

    res.status(200).json({ message: `Đã cập nhật thông tin khách hàng có ID ${customerId}` });
  });
});


// app.put('/customers/:id', (req, res) => {
//     const customerId = parseInt(req.params.id);

//     // Kiểm tra xem req.body có tồn tại và có chứa các trường cần thiết không
//     const { HOTEN, EMAIL,PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH, TICHDIEM } = req.body;
//     if (!HOTEN || !EMAIL ||!PASSWORD|| !SDT || !GIOITINH || !DIACHI || !NGAYSINH || !TICHDIEM ) {
//         return res.status(400).json({ error: 'Thiếu thông tin cần thiết trong body request' });
//     }

//     // Cập nhật thông tin nhân viên trong cơ sở dữ liệu
//     const query = `
//     UPDATE khachhang
//     SET HOTEN = ?, EMAIL = ?, PASSWORD = ?, SDT = ?, GIOITINH = ?, DIACHI = ?, NGAYSINH =?, TICHDIEM=? 
//     WHERE MAKH = ?;
//   `;

//     db.query(query, [HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH, TICHDIEM, customerId], (err, result) => {
//         if (err) {
//             console.error('Lỗi khi cập nhật thông tin nhân viên:', err);
//             return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin nhân viên' });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: `Không tìm thấy nhân viên có ID ${customerId}` });
//         }

//         res.status(200).json({ message: `Đã cập nhật nhân viên có ID ${customerId}` });
//     });
// });
// Tìm kiếm khach hang
app.get('/customers/search', (req, res) => {
  const searchQuery = req.query.query;
  const query = 'SELECT * FROM khachhang WHERE HOTEN LIKE ? OR EMAIL LIKE ? OR SDT LIKE ?';

  db.query(query, [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.status(200).json(results);
    }
  });
});
app.get('/uudai', (req, res) => {
  const query = 'SELECT * FROM uudai ORDER BY TICHDIEM DESC;';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'Select * from KHACHHANG where EMAIL = ? and PASSWORD = ?';
  db.query(query, [email, password], (err0, results0) => {
    if (err0) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results0.length > 0) {
        results0[0].CATEGORY = 0;
        res.status(200).json(results0);
      }
      else {
        const query1 = 'Select * from NHANVIEN where EMAIL = ? and PASSWORD = ?';
        db.query(query1, [email, password], (err1, results1) => {
          if (err1) {
            console.error('Error executing query:', err1);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            if (results1.length > 0) {
              results1[0].CATEGORY = 1;
              res.status(200).json(results1);
            } else {
              const query2 = 'Select * from ADMIN where EMAIL = ? and PASSWORD = ?';
              db.query(query2, [email, password], (err2, results2) => {
                if (err2) {
                  console.error('Error executing query:', err2);
                  res.status(500).json({ error: 'Internal Server Error' });
                } else {
                  if (results2.length > 0) {
                    results2[0].CATEGORY = 2;
                    res.status(200).json(results2);
                  } else {
                    res.status(404).json("No user found");
                  }
                }
              });
            }
          }
        })
      }
    }
  })
});

app.get('/api/doctor-list', (req, res) => {
  const query = 'SELECT MANS, TENNS from nhasi';
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

app.get('/api/review-doctor/:MANS', (req, res) => {
  const query = 'SELECT danhgia_bacsi.MAKH, danhgia_bacsi.NGAYKHAM, appointment.KHUNGGIO, khachhang.HOTEN, service.TENDV, nhasi.TENNS, danhgia_bacsi.SOSAONS, danhgia_bacsi.BINHLUANNS FROM danhgia_bacsi JOIN appointment ON (danhgia_bacsi.MAKH = appointment.MAKH AND danhgia_bacsi.NGAYKHAM = appointment.NGAYKHAM) JOIN khachhang ON appointment.MAKH = khachhang.MAKH JOIN service ON appointment.MADV = service.MADV JOIN nhasi ON appointment.MANS = nhasi.MANS WHERE appointment.MANS=?';
  const { MANS } = req.params;
  db.query(query, [MANS], (err, results) => {
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

app.delete('/api/review-doctor/:MAKH/:NGAYKHAM', (req, res) => {
  const query = 'DELETE FROM danhgia_bacsi WHERE MAKH=? AND NGAYKHAM=?';
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

app.get('/api/service-list', (req, res) => {
  const query = 'SELECT MADV, TENDV from service';
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

app.get('/api/review-service/:MADV', (req, res) => {
  const query = 'SELECT danhgia_dichvu.MAKH, danhgia_dichvu.NGAYKHAM, appointment.KHUNGGIO, khachhang.HOTEN, service.TENDV, nhasi.TENNS, danhgia_dichvu.SOSAODV, danhgia_dichvu.BINHLUANDV FROM danhgia_dichvu JOIN appointment ON (danhgia_dichvu.MAKH = appointment.MAKH AND danhgia_dichvu.NGAYKHAM = appointment.NGAYKHAM) JOIN khachhang ON appointment.MAKH = khachhang.MAKH JOIN service ON appointment.MADV = service.MADV JOIN nhasi ON appointment.MANS = nhasi.MANS WHERE appointment.MADV=?';
  const { MADV } = req.params;
  db.query(query, [MADV], (err, results) => {
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

app.delete('/api/review-service/:MAKH/:NGAYKHAM', (req, res) => {
  const query = 'DELETE FROM danhgia_dichvu WHERE MAKH=? AND NGAYKHAM = ?';
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

app.get('/api/dailyRevenue', (req, res) => {
  const query = `
    SELECT DATE_FORMAT(NGAYKHAM, '%d-%m-%Y') AS Ngay, SUM(GIA) AS DoanhThu
    FROM appointment a
    JOIN service s ON a.MADV = s.MADV
    WHERE a.KHOATHANHTOAN = 2
    GROUP BY DATE_FORMAT(NGAYKHAM, '%d-%m-%Y')
    ORDER BY DATE_FORMAT(NGAYKHAM, '%Y-%m-%d') ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    }

    const data = {};

    if (results.length > 0) {
      results.forEach((row) => {
        data[row.Ngay] = row.DoanhThu;
      });
      res.json(data );
    } else {
      res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
    }
  });
});

app.get('/api/monthlyRevenue', (req, res) => {
    const query = `
      SELECT DATE_FORMAT(NGAYKHAM, '%m-%Y') AS Thang, SUM(GIA) AS DoanhThu
      FROM appointment a
      JOIN service s ON a.MADV = s.MADV
      WHERE a.KHOATHANHTOAN = 2
      GROUP BY DATE_FORMAT(NGAYKHAM, '%m-%Y')
      ORDER BY DATE_FORMAT(NGAYKHAM, '%Y-%m') ASC
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      }
  
      const data = {};
  
      if (results.length > 0) {
        results.forEach((row) => {
          data[row.Thang] = row.DoanhThu;
        });
        res.json(data);
      } else {
        res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
      }
    });
});

// Get customer profile
app.get('/getProfile/:MAKH', (req, res) => {
  const customerID = req.params.MAKH;

  const sql = `SELECT * FROM khachhang WHERE MAKH = ?`;
  db.query(sql, [customerID], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }

    if (results.length > 0) {
      const row = results[0];
      const formattedDate = moment(row.NGAYSINH).format('DD/MM/YYYY');
      row.NGAYSINH = formattedDate;

      res.json(row);
    } else {
      res.status(404).json({ error: 'Không tìm thấy thông tin khách hàng' });
    }
  });
});

// Update customer profile
app.post('/updateProfile/:MAKH', (req, res) => {
  const { name, phoneNumber, gender, address, birthDate } = req.body;
  const customerID = req.params.MAKH;
  
  const genderCode = gender === "Nam" ? 1 : 0;

  const formattedBirthDate = moment(birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

  const sqlCheckChanges = `SELECT * FROM khachhang WHERE MAKH = ?`;
  db.query(sqlCheckChanges, [customerID], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }

    if (results.length > 0) {
      const rowBeforeUpdate = results[0];
      if (
        rowBeforeUpdate.HOTEN === name &&
        rowBeforeUpdate.SDT === phoneNumber &&
        rowBeforeUpdate.GIOITINH === genderCode &&
        rowBeforeUpdate.DIACHI === address &&
        moment(rowBeforeUpdate.NGAYSINH).format('YYYY-MM-DD') === formattedBirthDate
      ) {
        return res.json({ success: true, message: 'No changes detected' });
      } else {
        const sqlUpdateProfile = `
          UPDATE khachhang
          SET HOTEN = ?, SDT = ?, GIOITINH = ?, DIACHI = ?, NGAYSINH = ?
          WHERE MAKH = ?`;

        db.query(sqlUpdateProfile, [name, phoneNumber, genderCode, address, formattedBirthDate, customerID], (updateError) => {
          if (updateError) {
            return res.status(500).json({ error: 'Error updating profile' });
          }

          return res.json({ success: true, message: 'Profile updated' });
        });
      }
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});