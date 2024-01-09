app.put('api/update/:MAKH', (req, res) => {
//   const query = 'UPDATE khachhang SET TICHDIEM = TICHDIEM + 5   WHERE MAKH=? ';

//   const { MAKH } = req.params;
//   db.query(query, [MAKH], (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       console.log(MAKH);
//       console.log('SQL query successful');
//       console.log('Results:', results);
//       res.sendStatus(200);
//     }
//   });
// });