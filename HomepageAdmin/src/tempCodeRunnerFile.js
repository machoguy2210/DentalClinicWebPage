
//     // Cập nhật thông tin nhân viên trong cơ sở dữ liệu
//     const query = `
//     UPDATE khachhang
//     SET HOTEN = ?, EMAIL = ?, PASSWORD = ?, SDT = ?, GIOITINH = ?, DIACHI = ?, NGAYSINH =?, TICHDIEM=? 
//     WHERE MAKH = ?;
//   `;

//     db.query(query, [HOTEN, EMAIL, PASSWORD, SDT, GIOITINH, DIACHI, NGAYSINH, TICHDIEM, customerId], (err, result) => {
//         if (err) {
//             console.error('Lỗi khi cập nhật thông tin nhân viên:', err);
// 