const express = require('express');
const db = require('../connection');

const router = express.Router();

router.post('/studentdata', (req, res) => {
  const { className,sectionName } = req.body;
  let query;
  if(className){
    query = `SELECT * FROM ${className}_${sectionName}_biodata ;`;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  })}
  else{
    res.status(500).json({ message: 'No Data found' });
  }
});
router.put('/studentdata/:Adm_no', (req, res) => {
  const adm_no=req.params.Adm_no;
  const {updatedStudent,selectedClass,selectedSection} = req.body;

  const query = `UPDATE ${selectedClass}_${selectedSection}_biodata SET ? WHERE adm_no = '${adm_no}'`;

  db.query(query, [updatedStudent], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows > 0) {
        // Send a success response along with a message
        res.json({ success: true, message: 'Student updated successfully' });
      } else {
        // Send a not found response along with an error message
        res.status(404).json({ success: false, error: 'Student not found' });
      }
    }
  });
});
router.get("/studentdata/:table", (req, res) => {
  const table = req.params.table;
  const query = `SELECT * FROM ${table}`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ success: true, results });
    }
  });
});


module.exports = router;
