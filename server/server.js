const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Thêm dòng này để import thư viện cors
const app = express();
app.use(express.json());
// Sử dụng cors middleware
app.use(cors());

// Tạo kết nối đến cơ sở dữ liệu
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dentalclinicdb',
    port: 3306
});

// Kết nối đến cơ sở dữ liệu
db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
    } else {
        console.log('Kết nối đến cơ sở dữ liệu thành công.');
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////

// API Appointment

//////////////////////////////////////////////////////////////////////////////////////////////////

// * API endpoint để lấy thông tin cuộc hẹn
app.get('/appointments', (req, res) => {
    const query = 'SELECT * FROM appointment,khachhang,nhasi,service WHERE appointment.MAKH=khachhang.MAKH AND appointment.MANS=nhasi.MANS AND service.MADV=appointment.MADV ;';

    db.query(query, (err, results) => {
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

    // Xóa nhân viên có ID tương ứng

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
})


app.put('/customers/:id', (req, res) => {
    const customerId = parseInt(req.params.id);

    // Kiểm tra xem req.body có tồn tại và có chứa các trường cần thiết không
    const { HOTEN, EMAIL, SDT, GIOITINH, DIACHI, NGAYSINH, PASSWORD, TICHDIEM } = req.body;
    if (!HOTEN || !EMAIL || !SDT || !GIOITINH || !DIACHI || !NGAYSINH || !TICHDIEM || !PASSWORD) {
        return res.status(400).json({ error: 'Thiếu thông tin cần thiết trong body request' });
    }

    // Cập nhật thông tin nhân viên trong cơ sở dữ liệu
    const query = `
    UPDATE khachhang
    SET HOTEN = ?, EMAIL = ?, PASSWORD = ?, SDT = ?, GIOITINH = ?, DIACHI = ?, NGAYSINH = ?,TICHDIEM=?
    WHERE MAKH = ?;
  `;

    db.query(query, [HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH, TICHDIEM, customerId], (err, result) => {
        if (err) {
            console.error('Lỗi khi cập nhật thông tin nhân viên:', err);
            return res.status(500).json({ error: 'Lỗi khi cập nhật thông tin nhân viên' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Không tìm thấy nhân viên có ID ${customerId}` });
        }

        res.status(200).json({ message: `Đã cập nhật nhân viên có ID ${customerId}` });
    });
});

// Khởi động máy chủ Express
// const port = process.env.PORT || 3000;
const port = 3000;

app.listen(port, () => {
    console.log(`Máy chủ đã khởi động trên cổng ${port}`);
});
