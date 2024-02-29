const express = require("express");
const db = require("../connection");

const router = express.Router();

router.get("/teachers", (req, res) => {
  const query = "SELECT * FROM teacher";
  db.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
router.get("/salaries", (req, res) => {
  const query = "SELECT * FROM salaries";
  db.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
router.get("/classes", (req, res) => {
  const query = "SELECT * FROM classes";
  db.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
router.post("/updatedata", (req, res) => {
  const { selectedTeacher, selectedClass, selectedSubjects ,selectedSection} = req.body;
  if (
    !selectedTeacher ||
    !selectedClass ||
    !selectedSubjects ||
    selectedSubjects.length === 0
  ) {
    return res.status(400).json({ error: "Invalid parameters" });
  }
  const setClause = selectedSubjects
    .map((subject) => `${subject} = '${selectedTeacher}'`)
    .join(", ");
  const updateClassesQuery = `UPDATE classes SET ${setClause} WHERE class_name = ? and section = ? `;
  db.query(
    updateClassesQuery,
    [selectedClass,selectedSection],
    (updateError, updateResults) => {
      if (updateError) throw updateError;

      res.json({ success: true });
    }
  );
});
router.post("/removedata", (req, res) => {
  const { selectedTeacher, selectedClass, subject } = req.body;
  if (!selectedTeacher || !selectedClass || !subject) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const updateClassesQuery = `UPDATE classes SET ${subject}="yes" WHERE class_name = ${selectedClass}`;

  db.query(updateClassesQuery, (updateError, updateResults) => {
    if (updateError) throw updateError;

    res.json({ success: true });
  });
});


router.post('/salary', (req, res) => {
  const fields = Object.keys(req.body);
  const sql = `INSERT INTO salaries (${fields.join(', ')}) VALUES (${Array(fields.length).fill('?').join(', ')})`;
  const values = fields.map(field => req.body[field]);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting employee: ' + err.stack);
      res.status(500).json({ error: 'An error occurred while inserting employee.' });
      return;
    }
    res.status(200).json({ message: 'Employee inserted successfully.' });
  });
});


router.post("/update",  (req, res) => {
  const updatedData = req.body;
  const { updatedFields } = updatedData;

  const updateFieldsString = Object.keys(updatedFields)
    .map((key) => `${key}="${updatedFields[key]}"`)
    .join(", ");

  const sql = `UPDATE teacher SET ${updateFieldsString} WHERE teacher_id = ${updatedData.userId};`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during update:", err);
      return res.status(500).json({ error: "Error during update" });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Update successful" });
    } else {
      res.status(404).json({ error: "User not found or no changes applied" });
    }
  });
});


module.exports = router;
