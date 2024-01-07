app.put('/customers/:id', (req, res) => {
    const customerId = parseInt(req.params.id);
    const { HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH, TICHDIEM } = req.body;

    // Kiểm tra xem các trường cần thiết có được cung cấp hay không
    if (!HOTEN || !EMAIL || !PASSWORD || !SDT || !GIOITINH || !DIACHI || !NGAYSINH || !TICHDIEM) {
        return res.status(400).json({ error: 'Thiếu thông tin cần thiết trong yêu cầu' });
    }

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
