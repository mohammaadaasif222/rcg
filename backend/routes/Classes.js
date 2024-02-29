const express = require("express");
const router = express.Router();
const db = require("../connection");

async function createTotalTable(classvalue, section, subjects) {
  try {
    const tableName = `${classvalue}_${section}_total`;

    // Create dynamic column names for subjects with 'yes' value with 't1' and 't2' prefixes
    const subjectColumns = Object.keys(subjects)
      .filter((subject) => subjects[subject] === "yes")
      .map((subject) => [`t1_${subject} FLOAT`, `t2_${subject} FLOAT`])
      .flat();

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      adm_no VARCHAR(45) UNIQUE NOT NULL, 
      ${subjectColumns.join(", ")},
      t1_total FLOAT,
      t2_total FLOAT,
      t1_percentage FLOAT,
      t2_percentage FLOAT,
      t1_grade VARCHAR(45),
      t2_grade VARCHAR(45),
      t1_scholastic_computer VARCHAR(45),
      t1_scholastic_drawing VARCHAR(45),
      t1_scholastic_gk VARCHAR(45),
      t1_scholastic_deciplin VARCHAR(45),
      t1_scholastic_remark VARCHAR(45),
      t1_scholastic_entery VARCHAR(45),
      t2_scholastic_workeducation VARCHAR(45),
      t2_scholastic_art VARCHAR(45),
      t2_scholastic_health VARCHAR(45),
      t2_scholastic_deciplin VARCHAR(45),
      t2_scholastic_remark VARCHAR(45),
      t2_scholastic_entery VARCHAR(45)
    );

    
    `;
    await db.promise().query(createTableQuery);

  } catch (error) {
    console.error("Error creating total table:", error);
  }
}
async function createTotalSecondryTable (classvalue, section, subjects) {
  try {
    const tableName = `${classvalue}_${section}_total`;

    // Create dynamic column names for subjects with 'yes' value with 't1' and 't2' prefixes
    const subjectColumns = Object.keys(subjects)
      .filter((subject) => subjects[subject] === "yes")
      .map((subject) => [`t1_${subject} FLOAT`])
      .flat();

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName}(
      id INT AUTO_INCREMENT PRIMARY KEY,
      adm_no VARCHAR(45) UNIQUE NOT NULL, 
      ${subjectColumns.join(", ")},
      t1_total_marks FLOAT,
      t1_grade varchar(45),
      t1_scholastic_art VARCHAR(45),
      t1_scholastic_computer VARCHAR(45),
      t1_scholastic_health VARCHAR(45),
      t1_scholastic_gk VARCHAR(45),
      t1_scholastic_drawing VARCHAR(45),
      t1_scholastic_deciplin VARCHAR(45),
      t1_scholastic_workeducation VARCHAR(45),
      t1_scholastic_remark VARCHAR(45),
      t1_scholastic_entry VARCHAR(45));`

    await db.promise().query(createTableQuery);

  } catch (error) {
    console.error("Error creating total table:", error);
  }
}
async function createTotalSeniorSecondryTable(classvalue, section, subjects) {
  try {
    const tableName = `${classvalue}_${section}_total`;

    // Create dynamic column names for subjects with 'yes' value with 't1' and 't2' prefixes
    const subjectColumns = Object.keys(subjects)
      .filter((subject) => subjects[subject] === "yes")
      .map((subject) => [`t1_${subject} FLOAT`])
      .flat();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        adm_no VARCHAR(45) UNIQUE NOT NULL, 
        ${subjectColumns.length > 0 ? subjectColumns.join(", ") + "," : ""}
        t1_total_marks FLOAT,
        t1_grade varchar(45),
        t1_scholastic_art VARCHAR(45),
        t1_scholastic_computer VARCHAR(45),
        t1_scholastic_health VARCHAR(45),
        t1_scholastic_gk VARCHAR(45),
        t1_scholastic_drawing VARCHAR(45),
        t1_scholastic_deciplin VARCHAR(45),
        t1_scholastic_workeducation VARCHAR(45),
        t1_scholastic_remark VARCHAR(45),
        t1_scholastic_entry VARCHAR(45));
    `;
    await db.promise().query(createTableQuery);

  } catch (error) {
    console.error("Error creating total table:", error);
  }
}

router.post("/create-class", async (req, res) => {
  try {
    const { class_name, class_section, ...subjectsData } = req.body;
    const classParts = class_name.split("_");
    const class_j = classParts[1];
    const classvalue = classParts[0];
    // Check if the class with the same class_j and class_section already exists
    const checkQuery = `
      SELECT * FROM classes
      WHERE class_name = ? AND section = ?`;

    const checkValues = [class_j, class_section];

    const [existingClassResult] = await db
      .promise()
      .query(checkQuery, checkValues);

    if (existingClassResult.length > 0) {
      // Class already exists, return an error response
      return res
        .status(400)
        .json({ success: false, message: "Class already exists" });
    }

    // If the class doesn't exist, proceed with insertion
    const subjectsColumns = Object.keys(subjectsData);
    const subjectsValues = Object.values(subjectsData);

    const subjectsPlaceholders = subjectsColumns.map(() => "?").join(", ");

    const insertQuery = `
      INSERT INTO classes (
        class_name, classvalue, section, ${subjectsColumns.join(", ")}
      ) VALUES (?, ?, ?, ${subjectsPlaceholders})`;

    const insertValues = [
      class_j,
      classvalue,
      class_section,
      ...subjectsValues,
    ];

    await db.promise().query(insertQuery, insertValues);

    // Check if class_j is 13 or 14, if not create total table
    if (class_j != 13 && class_j != 14) {
      if (class_j == 10 || class_j == 9) {
        await createTotalSecondryTable(
          classvalue,
          class_section.toLowerCase(),
          subjectsData
        );
      } else if (class_j == 11 || class_j == 12) {
        await createTotalSeniorSecondryTable(
          classvalue,
          class_section.toLowerCase(),
          subjectsData
        );
      } else {
        await createTotalTable(
          classvalue,
          class_section.toLowerCase(),
          subjectsData
        );
      }
    }

    res
      .status(201)
      .json({ success: true, message: "Class is created successfully" });
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.post("/create-newsubject", async (req, res) => {
  try {
    let newSubject = req.body.newSubject;
    newSubject = newSubject.replace(/ /g, "_");
    const addColumnQuery = `
        ALTER TABLE classes
        ADD COLUMN ${newSubject} VARCHAR(255) DEFAULT 'no';
      `;

    db.query(addColumnQuery, (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_FIELDNAME") {
          res
            .status(409)
            .json({ success: false, error: "Subject column already exists" });
        } else {
          console.error("MySQL query error:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.json({
          success: true,
          message: "Subject column added successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/delete-subject", async (req, res) => {
  try {
    let newSubject = req.body.newSubject;
    newSubject = newSubject.replace(/ /g, "_");
    const addColumnQuery = `
      ALTER TABLE classes
      DROP COLUMN ${newSubject};
      `;

    db.query(addColumnQuery, (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_FIELDNAME") {
          res
            .status(409)
            .json({ success: false, error: "Subject column already exists" });
        } else {
          console.error("MySQL query error:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.json({
          success: true,
          message: "Subject column added successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
router.get("/subjects", async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("DESCRIBE classes", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    // Extract column names excluding the first four
    const columnNames = result.slice(4).map((column) => column.Field);

    res.json(columnNames);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function ReditTotalTable(classvalue, section, subject) {
  try {
    const Section = section.toLowerCase();
    const columnNames = [`t1${subject}`, `t2${subject}`];

    const removeColumnsQuery = `ALTER TABLE ${classvalue}_${Section}_total DROP COLUMN t1_${subject},  DROP COLUMN t2_${subject};`;

    await db.promise().query(removeColumnsQuery);
  } catch (error) {
    console.error("Error creating total table:", error);
  }
}
router.put("/redit-class", async (req, res) => {
  try {
    const { classval, selectedSection, subject } = req.body;
    const addColumnQuery = `
      UPDATE classes
      SET ${subject} = 'no'
      WHERE classvalue = '${classval}' AND section = '${selectedSection}';
    `;

    db.query(addColumnQuery, (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_FIELDNAME") {
          res
            .status(409)
            .json({ success: false, error: "subject column not found" });
        } else {
          console.error("MySQL query error:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.json({ success: true, message: "Subject removed successfully" });
        ReditTotalTable(classval, selectedSection, subject);
      }
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

async function EditTotalTable(classvalue, section, subject) {
  try {
    const Section = section.toLowerCase();

    const addColumnsQuery = `ALTER TABLE ${classvalue}_${Section}_total ADD COLUMN t1_${subject} FLOAT,  ADD COLUMN t2_${subject} FLOAT;`;

    await db.promise().query(addColumnsQuery);
  } catch (error) {
    console.error("Error creating total table:", error);
  }
}
router.put("/edit-class", async (req, res) => {
  try {
    const { classvalue, selectedSection, selectedSubjects } = req.body;
    for (const subject of selectedSubjects) {
      const updateQuery = `
              UPDATE classes
              SET ${subject} = 'yes'
              WHERE classvalue = '${classvalue}' AND section = '${selectedSection}';
            `;

      await db.promise().query(updateQuery);
      EditTotalTable(classvalue, selectedSection, subject);
    }

    res.json({ success: true, message: "Subjects updated successfully" });
  } catch (error) {
    console.error("Error updating subjects:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
