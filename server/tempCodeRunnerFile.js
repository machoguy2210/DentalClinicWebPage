// * API endpoint để lấy thông tin cuộc hẹn
app.get('/appointments/:MAKH', (req, res) => {
    const MAKH = req.params.MAKH;
MAKH=1;
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
