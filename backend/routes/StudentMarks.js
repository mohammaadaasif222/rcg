const express = require("express");
const db = require("../connection");

const router = express.Router();

router.post("/marks", async (req, res) => {
  try {
    const { selectedClass, selectedSubject, selectedSection } = req.body;
    
    if (!selectedClass || !selectedSubject || !selectedSection) {
      return res.status(400).json({ message: "Selected class, subject, and section are required." });
    }

    let query;
    const section = selectedSection.toLowerCase();
    
    query = `SELECT * FROM ${selectedClass}_${section}_biodata JOIN ${selectedClass}_${section}_${selectedSubject} on ${selectedClass}_${section}_biodata.adm_no = ${selectedClass}_${section}_${selectedSubject}.Adm_no;`;
    
    const results = await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching marks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/marks/:adm_no", (req, res) => {
  const {
    updatedStudentMarks,
    selectedClass,
    selectedSubject,
    selectedSection,
  } = req.body;
  const adm_no = req.params.adm_no;
  let query;
  let section = selectedSection.toLowerCase();
  if (selectedClass && selectedSubject) {
    query = `UPDATE ${selectedClass}_${section}_${selectedSubject} SET ? WHERE adm_no = "${adm_no}"`;
  } else {
    query = `UPDATE fifthenglish SET ? WHERE adm_no = ${adm_no}`;
  }
  db.query(query, [updatedStudentMarks], (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows > 0) {
        res.json({ success: true, message: "Student updated successfully" });
      } else {
        res.status(404).json({ success: false, error: "Student not found" });
      }
    }
  });
});
router.get(
  "/totalmarks/:selectedClass/:selectedSection/:adm_no",
  (req, res) => {
    const adm_no = req.params.adm_no;
    const selectedClass = req.params.selectedClass;
    const selectedSection = req.params.selectedSection;
    let query;
    let section = selectedSection.toLowerCase();

    if (selectedClass && adm_no) {
      query = `SELECT * FROM ${selectedClass}_${section}_total where adm_no='${adm_no}';`;
    }
    db.query(query, (err, results) => {
      if (err) {
        console.error("MySQL query error:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(results);
      }
    });
  }
);
/////////////////////

router.get("/primarygrade/:selectedClass/:adm_no", (req, res) => {
  const adm_no = req.params.adm_no;
  const selectedClass = req.params.selectedClass;
  let query;
  if (selectedClass && adm_no) {
    query = `SELECT * FROM ${selectedClass}_a_total where adm_no='${adm_no}';`;
  }
  db.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});
///////////////////////
// POST endpoint to save data to the database
router.post("/nursery", (req, res) => {
  const requestBody = req.body;

  // Check if the student exists in the class_name+section_biodata table
  const studentId = requestBody.adm_no; // Assuming adm_no is the unique identifier for the student
  const checkStudentQuery = `
    SELECT * FROM nursery_a_biodata WHERE adm_no = ${db.escape(studentId)}
  `;
  db.query(checkStudentQuery, (err, studentResult) => {
    if (err) {
      console.error("Error executing SQL query: " + err.stack);
      res.status(500).json({
        success: false,
        error: "Error checking student existence in the database",
      });
      return;
    }
    if (studentResult.length === 0) {
      res.status(404).json({ success: false, error: "Student does not exist" });
      return;
    }

    // Check if the student's marks already exist in the nursery table
    const checkMarksQuery = `
      SELECT * FROM nursery WHERE adm_no = ${db.escape(studentId)}
    `;
    db.query(checkMarksQuery, (err, marksResult) => {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        res.status(500).json({
          success: false,
          error: "Error checking student marks existence in the database",
        });
        return;
      }
      if (marksResult.length > 0) {
        // If student's marks already exist, ignore the insertion
        res.status(405).json({
          success: false,
          error:
            "Student marks already exist in the nursery table. Ignoring insertion.",
        });
        return;
      }

      // Constructing placeholders for values
      const values = Object.values(requestBody);
      const valuePlaceholders = values.map((val) => db.escape(val)).join(", ");

      // Constructing column names
      const columns = Object.keys(requestBody).join(", ");

      // SQL query to insert data into the database table
      const sqlQuery = `
        INSERT INTO nursery (${columns}) VALUES (${valuePlaceholders})
      `;

      // Execute the SQL query to insert marks
      db.query(sqlQuery, (err, result) => {
        if (err) {
          console.error("Error executing SQL query: " + err.stack);
          res.status(500).json({
            success: false,
            error: "Error saving data to the database",
          });
          return;
        }
        res
          .status(200)
          .json({ success: true, message: "Data saved successfully" });
      });
    });
  });
});

router.post("/marks/graph/:selectedClass/:selectedSection", (req, res) => {
  const selectedClass = req.params.selectedClass;
  const selectedSection = req.params.selectedSection;
  let section = selectedSection.toLowerCase();
  let query;
  if (selectedClass) {
    query = `SELECT fb.gender, ft.* FROM ${selectedClass}_${section}_biodata AS fb JOIN ${selectedClass}_${section}_total AS ft ON fb.adm_no = ft.adm_no`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

router.get(
  "/reportcard/:selectedClass/:selectedSection/:adm_no",
  (req, res) => {
    const { selectedClass, selectedSection, adm_no } = req.params;
    try {
      const queryTableNames = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'gurunanak2024'
        AND table_name LIKE '${selectedClass}_${selectedSection}%'
        AND table_name NOT LIKE '${selectedClass}_${selectedSection}_%total'
        AND table_name NOT LIKE '${selectedClass}_${selectedSection}_%biodata'
    `;

      db.query(queryTableNames, (err, results) => {
        if (err) {
          console.error("MySQL query error:", err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          const tableRows = results.map((result) => result.TABLE_NAME);

          if (tableRows && tableRows.length > 0) {
            const queries = tableRows.map(
              (table) => `
            SELECT
              '${table}' AS subject,
              ${table}.weightage_term1,
              ${table}.portfoilo_term1,
              ${table}.sub_enrich_act_term1,
              ${table}.hly_exam_term1,
              ${table}.final_grade_term_1 AS t1grade,
              ${table}.weightage_term2,
              ${table}.portfoilo_term2,
              ${table}.sub_enrich_act_term2,
              ${table}.annual_exam,
              ${table}.final_grade_term_2 AS t2grade,
              ${table}.total_marks_term_1,
              ${table}.total_marks_term_2 AS marks_obtained
            FROM ${table}
            WHERE ${table}.adm_no = ?
          `
            );

            const values = tableRows.map((table) =>
              table === `${selectedClass}_${selectedSection}_biodata`
                ? [adm_no]
                : [adm_no]
            );
            const query = queries.join(" UNION ALL ");

            db.query(query, values.flat(), (err, results) => {
              if (err) {
                console.error("MySQL query error:", err);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                res.json(results);
              }
            });
          } else {
            console.error("No eligible table names found.");
            res.status(404).json({ message: "No eligible table names found." });
          }
        }
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
router.get(
  "/reportcardtwo/:selectedClass/:selectedSection/:adm_no",
  async (req, res) => {
    const { selectedClass, selectedSection, adm_no } = req.params;

    try {
      const queryTableNames = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'gurunanak2024'
        AND table_name LIKE '${selectedClass}_${selectedSection}%'
        AND table_name NOT LIKE '${selectedClass}_${selectedSection}_%total'
        AND table_name NOT LIKE '${selectedClass}_${selectedSection}_%biodata'
        AND table_name NOT LIKE '${selectedClass}_${selectedSection}_%vocational'
    `;

      db.query(queryTableNames, (err, results) => {
        if (err) {
          console.error("MySQL query error:", err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          const tableRows = results.map((result) => result.TABLE_NAME);
          if (tableRows && tableRows.length > 0) {
            const nonVocationalTables = tableRows.filter(table => !table.includes('vocational'));
            const vocationalTables = tableRows.filter(table => table.includes('vocational'));
          
            const nonVocationalQueries = nonVocationalTables.map(table => `
                SELECT
                  '${table}' AS subject,
                  pen_paper_pt1,
                  pen_paper_pt2,
                  pen_paper_pt3,
                  best_of_two,
                  multiple_assessment,
                  portfoilo,
                  sub_enrich_act,
                  annual_exam,
                  grand_total,
                  final_grade,
                  NULL AS theory_max,
                  NULL AS theory_obtain,
                  NULL AS practical_max,
                  NULL AS practical_obtain
                FROM ${table}
                WHERE adm_no = ?
            `);
          
            const vocationalQueries = vocationalTables.map(table => `
                SELECT
                  '${table}' AS subject,
                  NULL AS pen_paper_pt1,
                  NULL AS pen_paper_pt2,
                  NULL AS pen_paper_pt3,
                  NULL AS best_of_two,
                  NULL AS multiple_assessment,
                  NULL AS portfoilo,
                  NULL AS sub_enrich_act,
                  NULL AS annual_exam,
                  NULL AS grand_total,
                  NULL AS final_grade,
                  theory_max,
                  theory_obtain,
                  practical_max,
                  practical_obtain
                FROM ${table}
                WHERE adm_no = ?
            `);
          
            const nonVocationalValues = nonVocationalTables.map(table =>
              table === `${selectedClass}_${selectedSection}_biodata` ? [adm_no] : [adm_no]
            );
          
            const vocationalValues = vocationalTables.map(table => [adm_no]);
          
            const nonVocationalQuery = nonVocationalQueries.join(" UNION ALL ");
            const vocationalQuery = vocationalQueries.join(" UNION ALL ");
          
            db.query(`${nonVocationalQuery} UNION ALL ${vocationalQuery}`, [...nonVocationalValues.flat(), ...vocationalValues.flat()], (err, results) => {
              if (err) {
                console.error("MySQL query error:", err);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                res.json(results);
              }
            });
          } else {
            console.error("No eligible table names found.");
            res.status(404).json({ message: "No eligible table names found." });
          }
          
        }
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/vocational", (req, res) => {
  const data = req.body;

  // Generate table name based on class_name, section, and subject
  const tableName = `${data.class_name}_${data.section}_${data.subject}`;

  // Check if table exists, create if not
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_name VARCHAR(255),
      adm_no VARCHAR(255),
      theory_max INT,
      theory_obtain INT,
      practical_max INT,
      practical_obtain INT
    )
  `;
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      res.status(500).send("Error creating table");
      return;
    }
    console.log("Table created or already exists");

    const checkStudentQuery = `
      SELECT * FROM ${tableName} WHERE adm_no = ?
    `;
    db.query(checkStudentQuery, [data.adm_no], (err, rows) => {
      if (err) {
        console.error("Error checking student:", err);
        res.status(500).send("Error checking student");
        return;
      }

      if (rows.length > 0) {
        res.status(400).send("Student data already exists");
        return;
      }

      // Insert data into the table
      const insertQuery = `
        INSERT INTO ${tableName} 
        (student_name, adm_no, theory_max, theory_obtain, practical_max, practical_obtain) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [
        data.student_name,
        data.adm_no,
        data.theory_max,
        data.theory_obtain,
        data.practical_max,
        data.practical_obtain,
      ];

      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error("Error saving data to MySQL:", err);
          res.status(500).send("Error saving data");
          return;
        }
        console.log("Data saved to MySQL");
        res.status(200).send("Data saved successfully");
      });
    });
  });
});

router.get(
  "/reportcardthree/:selectedClass/:selectedSection/:adm_no",
  async (req, res) => {
    const { selectedClass, selectedSection, adm_no } = req.params;
    try {
      const queryTableNames = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'gurunanak2024'
        AND table_name LIKE '${selectedClass}_${selectedSection}%'
        AND table_name NOT LIKE '${selectedClass}_${selectedSection}_%total'
        AND table_name NOT LIKE '${selectedClass}_${selectedSection}_%biodata'
    `;

      db.query(queryTableNames, (err, results) => {
        if (err) {
          console.error("MySQL query error:", err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          const tableRows = results.map((result) => result.TABLE_NAME);

          if (tableRows && tableRows.length > 0) {
            const queries = tableRows.map(
              (table) => `
        SELECT
          '${table}' AS subject,
          ${table}.theory_max,
          ${table}.theory_obtain,
          ${table}.practical_max,
          ${table}.practical_obtain,
          ${table}.overall,
          ${table}.overall_grade
        FROM ${table}
        WHERE ${table}.adm_no = ?
      `
            );

            const values = tableRows.map((table) =>
              table === `${selectedClass}_${selectedSection}_biodata`
                ? [adm_no]
                : [adm_no]
            );

            const query = queries.join(" UNION ALL ");

            db.query(query, values.flat(), (err, results) => {
              if (err) {
                console.error("MySQL query error:", err);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                res.json(results);
              }
            });
          } else {
            console.error("No eligible table names found.");
            res.status(404).json({ message: "No eligible table names found." });
          }
        }
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
