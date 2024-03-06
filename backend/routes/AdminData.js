const express = require("express");
const router = express.Router();
const db = require("../connection");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const csv = require("csv-parser");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const uploadcsv = multer({ dest: "uploads/" });
const uploadStudentsData = multer({ dest: "students/" });
const readline = require('readline');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../..//rcg/reportcard/src/static/teachers");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/login", (req, res) => {
  const userData = req.body;
  const { email, password } = userData;
  const sql = "SELECT * FROM teacher WHERE email=? AND password=?;";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Error during login" });
    }

    if (result.length > 0) {
      const user = result[0];

      const token = jwt.sign(
        { userId: user.teacher_id, role: user.role },
        "your-secret-key",
        { expiresIn: "24h" }
      );

      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});
router.post("/update", authenticateToken, (req, res) => {
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

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists in MySQL database
    db.query(
      "SELECT * FROM teacher WHERE email = ?",
      [email],
      async (error, results, fields) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: "User not found" });
        }

        const teacher = results[0];
        const resetToken = uuidv4();

        const jwtToken = jwt.sign(
          { teacher_id: teacher.teacher_id, resetToken },
          "your-secret-key",
          {
            expiresIn: "1h",
          }
        );

        // Update reset token and expiry in MySQL database
        db.query(
          `UPDATE teacher SET resetPasswordToken = ?, resetPasswordExpiry = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE teacher_id = ?`,
          [jwtToken, teacher.teacher_id],
          async (error, results, fields) => {
            if (error) {
              return res.status(500).json({ message: error.message });
            }
            try {
              await transporter.sendMail({
                from: "school-managemen@gmail.com",
                to: email,
                subject: "Password Reset",
                html: `<p>Click <a href="http://localhost:3000/reset-password/${jwtToken}">here</a> to reset your password.</p>`,
              });

              res.status(200).json({
                message: "Reset token generated and sent to " + email,
              });
            } catch (error) {
              res.status(500).json({ message: error.message });
            }
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and newPassword are required" });
    }

    // Query the database to find a teacher with the provided reset token and expiry
    db.query(
      "SELECT * FROM teacher WHERE resetPasswordToken = ? AND resetPasswordExpiry > NOW()",
      [token],
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: "Invalid or expired token" });
        }

        const teacher = results[0];

        // Update the teacher's password and clear reset token fields
        db.query(
          "UPDATE teacher SET password = ?, resetPasswordToken = NULL, resetPasswordExpiry = NULL WHERE teacher_id = ?",
          [newPassword, teacher.teacher_id],
          (updateError) => {
            if (updateError) {
              return res.status(500).json({ message: updateError.message });
            }

            res.status(200).json({ message: "Password reset successful" });
          }
        );
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/bio-data", async (req, res) => {
  try {
    const studentData = req.body;

    const { class_name, section, adm_no, ...studentBioData } = studentData;

    const tableName = `${class_name}_${section}_biodata`;

    const tableExistsQuery = `SHOW TABLES LIKE '${tableName}'`;
    const [tables] = await db.promise().query(tableExistsQuery);

    if (tables.length === 0) {
      const createTableQuery = `
        CREATE TABLE ${tableName} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          adm_no VARCHAR(255) UNIQUE, -- Making adm_no unique
          ${Object.keys(studentBioData)
            .map((key) => `${key} VARCHAR(255)`)
            .join(", ")}
        ) 
      `;
      await db.promise().query(createTableQuery);
    }

    const columns = ["adm_no", ...Object.keys(studentBioData)].join(", ");
    const valuesPlaceholders = Array(Object.keys(studentBioData).length + 1)
      .fill("?")
      .join(", ");
    const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;

    const values = [adm_no, ...Object.values(studentBioData)];

    await db.promise().query(insertQuery, values);

    res.status(201).json({
      success: true,
      message: `Student bio-data for ${class_name} - ${section} created successfully`,
    });
  } catch (error) {
    console.error("Error creating student bio-data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


async function csvHandler(filePath,class_name,subject_name) {
  const fileStream = fs.createReadStream(filePath);

  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  let subjects = [];
  const csvData = [];

  await new Promise((resolve, reject) => {
    lines.on('line', (line) => {
      lineCount++;
      if(class_name=="eleven" || class_name=="twelth"){
        if (lineCount === 1) {
          subjects = line.split(',').map(subject => subject.trim());
          return;
        }
      }
      else  if(class_name=="kg" || class_name=="nursery" || class_name=="prenursery"){
        if (lineCount === 1) {
          subjects = line.split(',').map(subject => subject.trim());
          return;
        }
      }
      else if(subject_name.includes('vocational')){
        if (lineCount === 1) {
          subjects = line.split(',').map(subject => subject.trim());
          return;
        }
      }
      else{
        if (lineCount === 1) return;
        if (lineCount === 2) {
          subjects = line.split(',').map(subject => subject.trim());
          return;
        }
      }
      const marks = line.split(',').map(mark => mark.trim());
      const studentData = marks.reduce((acc, mark, index) => {
        if (subjects[index] === 'adm_no') {
          acc[subjects[index]] = mark;
        } else {
          acc[subjects[index]] = isNaN(parseInt(mark, 10)) ? mark : parseInt(mark, 10);
        }
        return acc;
      }, {});

      csvData.push(studentData);
    }).on('close', () => {
      resolve(); 
    }).on('error', (err) => {
      reject(err); 
    });
  });
  return csvData;
}

router.post("/upload/marks", uploadcsv.single("file"), async (req, res) => {
  const { path: filePath } = req.file;
  const { class_name, section_name, subject_name ,subject_code} = req.body;
  
  let tablename;
  if(subject_code){
    tablename = `${class_name}_${section_name}_${subject_name}_${subject_code}`
  }
 else{
    tablename = `${class_name}_${section_name}_${subject_name}`;
  }
  try {
    let csvData;
       csvData = await csvHandler(filePath,class_name,subject_name);
    let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tablename} (`;
    createTableQuery += "adm_no VARCHAR(255) UNIQUE, "; // Ensure adm_no is unique
    for (const column in csvData[0]) {
      if (column !== "adm_no") {
        createTableQuery += `${column} VARCHAR(255), `;
      }
    }
    createTableQuery = createTableQuery.slice(0, -2); // Remove the last comma and space
    createTableQuery += ")";
    await db.promise().query(createTableQuery);

    for (const row of csvData) {

      // Check if student exists in the biodata table
      const studentExistsQuery = `SELECT COUNT(*) AS count FROM ${class_name}_${section_name}_biodata WHERE adm_no = ?`;
      const [studentExistsResult] = await db
        .promise()
        .query(studentExistsQuery, [row.adm_no]);
      const studentExists = studentExistsResult[0].count > 0;
      if (!studentExists) {
        return res
          .status(400)
          .json({ error: `Student with adm_no ${row.adm_no} does not exist` });
      }

      let columns = "adm_no";
      let values = `'${row.adm_no}'`;
      for (const column in row) {
        if (column !== "adm_no") {
          columns += `, ${column}`;
          values += `, '${row[column]}'`;
        }
      }
      // If student exists, proceed with checking marks table and insertion
      // Check if student exists in the marks table
      const studentMarksExistsQuery = `SELECT COUNT(*) AS count FROM ${tablename} WHERE adm_no = ?`;
      const [studentMarksExistsResult] = await db
      .promise()
      .query(studentMarksExistsQuery, [row.adm_no]);
      const studentMarksExists = studentMarksExistsResult[0].count > 0;

      let studentMarksExists2;
      if(class_name !== "kg"){
      const studentMarksExistsQuery2 = `SELECT COUNT(*) AS count FROM ${class_name}_${section_name}_total WHERE adm_no = ?`;
      const [studentMarksExistsResult2] = await db
        .promise()
        .query(studentMarksExistsQuery2, [row.adm_no]);
      studentMarksExists2 = studentMarksExistsResult2[0].count > 0;  }

      if (!studentMarksExists) {
        // Insert data into the marks table
        const insertQuery = `INSERT INTO ${tablename} (${columns}) VALUES (${values})`;
        await db.promise().query(insertQuery);
      } else {
        // If the student's marks exist, update the data in the table
        let updateQuery = `UPDATE ${tablename} SET `;
        for (const column in row) {
          if (column !== "adm_no") {
            updateQuery += `${column} = '${row[column]}', `;
          }
        }
        updateQuery = updateQuery.slice(0, -2); // Remove the last comma and space
        updateQuery += ` WHERE adm_no = '${row.adm_no}'`;
        await db.promise().query(updateQuery);
      }

      if (class_name == "ninth" || class_name == "ten") {
        if (studentMarksExists2) {
          const updateQuery = `UPDATE ${class_name}_${section_name}_total SET t1_${subject_name.replace("vocational_", "")} = ${row.grand_total} WHERE adm_no = '${row.adm_no}'`;
          await db.promise().query(updateQuery);
        } else {
          // Insert data into the total marks table
          const insertQuery2 = `INSERT INTO ${class_name}_${section_name}_total (adm_no, t1_${subject_name.replace("vocational_", "")}) VALUES ('${row.adm_no}', ${row.grand_total})`;
          await db.promise().query(insertQuery2);
        }
      }
      else if (class_name == "eleven" || class_name == "twelth") {
        if (studentMarksExists2) {
          const updateQuery = `UPDATE ${class_name}_${section_name}_total SET t1_${subject_name} = ${row.overall} WHERE adm_no = '${row.adm_no}'`;
          await db.promise().query(updateQuery);
        } else {
          // Insert data into the total marks table
          const insertQuery2 = `INSERT INTO ${class_name}_${section_name}_total (adm_no, t1_${subject_name}) VALUES ('${row.adm_no}', ${row.overall})`;
          await db.promise().query(insertQuery2);
        }
      }
      else {
        let count=0;
        if (class_name == "kg"){
          count+=1
          console.log(count,"check")
        }
        else{
        if (studentMarksExists2) {
          // Update data in the total marks table
          const updateQuery = `UPDATE ${class_name}_${section_name}_total SET t1_${subject_name} = ${row.total_marks_term_1}, t2_${subject_name} = ${row.total_marks_term_2} WHERE adm_no = '${row.adm_no}'`;
          await db.promise().query(updateQuery);
        } else {
          // Insert data into the total marks table
          const insertQuery2 = `INSERT INTO ${class_name}_${section_name}_total (adm_no, t1_${subject_name}, t2_${subject_name} ) VALUES ('${row.adm_no}', ${row.total_marks_term_1}, ${row.total_marks_term_2})`;
          await db.promise().query(insertQuery2);
        }}
      }
    }
    res.status(200).json({
      message: "Data saved successfully",
      csvData,
    });
  } catch (error) {
    console.error("Error uploading marks:", error);
    res.status(500).json({ error: "Error uploading marks" });
  }
});




router.post(
  "/upload/nursery-marks",
  uploadcsv.single("file"),
  async (req, res) => {
    const { path: filePath } = req.file;
    const { class_name, section_name } = req.body;
    const tablename = `${class_name}`;

    try {
      const csvData = await extractCsvData(filePath);

      // Create table if not exists
      let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tablename} (`;
      createTableQuery += "adm_no VARCHAR(255) UNIQUE, "; // Ensure adm_no is unique
      for (const column in csvData[0]) {
        if (column !== "adm_no") {
          createTableQuery += `${column} VARCHAR(255), `;
        }
      }
      createTableQuery = createTableQuery.slice(0, -2); // Remove the last comma and space
      createTableQuery += ")";
      await db.promise().query(createTableQuery);

      // Check if students already exist
      for (const row of csvData) {
        // Check if student exists in the biodata table
        const studentExistsQuery = `SELECT COUNT(*) AS count FROM ${class_name}_${section_name}_biodata WHERE adm_no = ?`;
        const [studentExistsResult] = await db
          .promise()
          .query(studentExistsQuery, [row.adm_no]);
        const studentExists = studentExistsResult[0].count > 0;

        if (!studentExists) {
          return res.status(400).json({
            error: `Student with adm_no ${row.adm_no} does not exist`,
          });
        }

        // If student exists, proceed with checking marks table and insertion
        // Check if student exists in the marks table
        const studentMarksExistsQuery = `SELECT COUNT(*) AS count FROM ${tablename} WHERE adm_no = ?`;
        const [studentMarksExistsResult] = await db
          .promise()
          .query(studentMarksExistsQuery, [row.adm_no]);

        const studentMarksExists = studentMarksExistsResult[0].count > 0;

        if (!studentMarksExists) {
          // Insert data into the marks table
          let columns = "adm_no";
          let values = `'${row.adm_no}'`;
          for (const column in row) {
            if (column !== "adm_no") {
              columns += `, ${column}`;
              values += `, '${row[column]}'`;
            }
          }
          const insertQuery = `INSERT INTO ${tablename} (${columns}) VALUES (${values})`;
          await db.promise().query(insertQuery);
        }
      }

      res.status(200).json({
        message: "Data saved successfully",
        csvData,
      });
    } catch (error) {
      console.error("Error uploading marks:", error);
      res.status(500).json({ error: "Error uploading marks" });
    }
  }
);




const extractCsvData = async (filePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
router.post(
  "/upload/student-data",
  uploadStudentsData.single("file"),
  async (req, res) => {
    const { path: filePath } = req.file;
    const { class_name, section_name } = req.body;
    const tablename = `${class_name}_${section_name}_biodata`;

    try {
      const csvData = await extractCsvData(filePath);

      // Create table if not exists
      let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tablename} (`;
      createTableQuery += "adm_no VARCHAR(255) UNIQUE, "; // Ensure adm_no is unique
      for (const column in csvData[0]) {
        if (column !== "adm_no") {
          createTableQuery += `${column} VARCHAR(255), `;
        }
      }
      createTableQuery = createTableQuery.slice(0, -2); // Remove the last comma and space
      createTableQuery += ")";
      db.query(createTableQuery);

      // Check if students already exist
      const existingStudentsQuery = `SELECT adm_no FROM ${tablename}`;
      const [existingStudents] = await db
        .promise()
        .query(existingStudentsQuery);

      const existingAdmNos = existingStudents.map((student) => student.adm_no);
      // Insert new students
      for (const row of csvData) {
        if (!existingAdmNos.includes(row.adm_no)) {
          let columns = "adm_no";
          let values = `'${row.adm_no}'`;
          for (const column in row) {
            if (column !== "adm_no") {
              columns += `, ${column}`;
              values += `, '${row[column]}'`;
            }
          }
          const insertQuery = `INSERT INTO ${tablename} (${columns}) VALUES (${values})`;
          await db.promise().query(insertQuery); // Await the query execution
        }
      }

      res.status(200).json({
        message: "Data saved successfully",
      });
    } catch (error) {
      console.error("Error uploading student data:", error);
      res.status(500).json({ error: "Error uploading student data" });
    }
  }
);

router.post("/subject-info", async (req, res) => {
  try {
    const data = req.body;
    const maindata = {
      class_name: data.class_name,
      section: data.section,
      subject: data.subject,
    };
    const totalTableData = {
      adm_no: data.adm_no,
      [`t1_${data.subject}`]: data.total_marks_term_1,
      t1_grade: data.final_grade_term_1,
      t1_scholastic_computer: data.t1_scholastic_computer,
      t1_scholastic_drawing: data.t1_scholastic_drawing,
      t1_scholastic_deciplin: data.t1_scholastic_deciplin,
      t1_scholastic_gk: data.t1_scholastic_gk,
      t1_scholastic_remark: data.t1_scholastic_remark,
      t1_scholastic_entery: data.t1_scholastic_entery,
      [`t2_${data.subject}`]: data.total_marks_term_2,
      t2_grade: data.final_grade_term_2,
      t2_scholastic_workeducation: data.t2_scholastic_workeducation,
      t2_scholastic_art: data.t2_scholastic_art,
      t2_scholastic_health: data.t2_scholastic_health,
      t2_scholastic_deciplin: data.t2_scholastic_deciplin,
      t2_scholastic_entery: data.t2_scholastic_entery,
      t2_scholastic_remark: data.t2_scholastic_remark,
    };
    const subjectTableData = {
      adm_no: data.adm_no,
      pen_paper_term1_pt1: data.pen_paper_term1_pt1,
      pen_paper_term1_pt2: data.pen_paper_term1_pt2,
      pen_paper_term1_pt3: data.pen_paper_term1_pt3,
      multiple_assessment_term1_pt1: data.multiple_assessment_term1_pt1,
      multiple_assessment_term1_pt2: data.multiple_assessment_term1_pt2,
      multiple_assessment_term1_pt3: data.multiple_assessment_term1_pt3,
      best_of_two_term1: data.best_of_two_term1,
      weightage_term1: data.weightage_term1,
      portfoilo_term1: data.portfoilo_term1,
      sub_enrich_act_term1: data.sub_enrich_act_term1,
      total_marks_term_1: data.total_marks_term_1,
      final_grade_term_1: data.final_grade_term_1,
      hly_exam_term1: data.hly_exam_term1,
      pen_paper_term2_pt1: data.pen_paper_term2_pt1,
      pen_paper_term2_pt2: data.pen_paper_term2_pt2,
      pen_paper_term2_pt3: data.pen_paper_term2_pt3,
      multiple_assessment_term2_pt1: data.multiple_assessment_term2_pt1,
      multiple_assessment_term2_pt2: data.multiple_assessment_term2_pt2,
      multiple_assessment_term2_pt3: data.multiple_assessment_term2_pt3,
      best_of_two_term2: data.best_of_two_term2,
      weightage_term2: data.weightage_term2,
      portfoilo_term2: data.portfoilo_term2,
      sub_enrich_act_term2: data.sub_enrich_act_term2,
      annual_exam: data.annual_exam,
      total_marks_term_2: data.total_marks_term_2,
      final_grade_term_2: data.final_grade_term_2,
    };

    const totalTableName = `${data.class_name}_${data.section}_total`;
    const subjectTableName = `${data.class_name}_${data.section}_${data.subject}`;

    // Check if subject table exists, if not, create it
    const subjectTableExistsQuery = `SHOW TABLES LIKE '${subjectTableName}'`;
    const [subjectTables] = await db.promise().query(subjectTableExistsQuery);

    if (subjectTables.length === 0) {
      const createSubjectTableQuery = `
        CREATE TABLE ${subjectTableName} (
          adm_no VARCHAR(45) UNIQUE,
          pen_paper_term1_pt1 float,
          multiple_assessment_term1_pt1 INT,
          pen_paper_term1_pt2 float,
          multiple_assessment_term1_pt2 INT,
          pen_paper_term1_pt3 float,
          multiple_assessment_term1_pt3 INT,
          best_of_two_term1 float,
          weightage_term1 float,
          portfoilo_term1 INT,
          sub_enrich_act_term1 INT,
          hly_exam_term1 float,
          total_marks_term_1 float,
          final_grade_term_1 VARCHAR(45),
    
          pen_paper_term2_pt1 float,
          multiple_assessment_term2_pt1 INT,
          pen_paper_term2_pt2 float,
          multiple_assessment_term2_pt2 INT,
          pen_paper_term2_pt3 float,
          multiple_assessment_term2_pt3 INT,
          best_of_two_term2 float,
          weightage_term2 float,
          portfoilo_term2 INT,
          sub_enrich_act_term2 INT,
          annual_exam float,
          total_marks_term_2 float,
          final_grade_term_2 VARCHAR(45),
          
          PRIMARY KEY (adm_no) 
        ) 
      `;
      await db.promise().query(createSubjectTableQuery);
    }

    const subjectInsertQuery = `INSERT INTO ${subjectTableName} SET ? ON DUPLICATE KEY UPDATE ?`;
    await db
      .promise()
      .query(subjectInsertQuery, [subjectTableData, subjectTableData]);

    const totalInsertQuery = `INSERT INTO ${totalTableName} SET ? ON DUPLICATE KEY UPDATE ?`;
    await db
      .promise()
      .query(totalInsertQuery, [totalTableData, totalTableData]);

    res
      .status(200)
      .json({ success: true, message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
router.post("/subject-secondary-info", async (req, res) => {
  try {
    const {
      class_name,
      student_name,
      subject,
      adm_no,
      section,
      pen_paper_pt1,
      pen_paper_pt2,
      pen_paper_pt3,
      multiple_assessment,
      best_of_two,
      portfoilo,
      sub_enrich_act,
      annual_exam,
      total_marks,
      final_grade,
      t1_scholastic_computer,
      t1_scholastic_drawing,
      t1_scholastic_deciplin,
      t1_scholastic_gk,
      t1_scholastic_remark,
      t1_scholastic_entry,
    } = req.body;
    const grand_total = annual_exam + total_marks;

    const totalTableData = {
      adm_no: adm_no,
      [`t1_${subject}`]: grand_total,
      t1_grade: final_grade,
      t1_scholastic_computer: t1_scholastic_computer,
      t1_scholastic_drawing: t1_scholastic_drawing,
      t1_scholastic_deciplin: t1_scholastic_deciplin,
      t1_scholastic_gk: t1_scholastic_gk,
      t1_scholastic_remark: t1_scholastic_remark,
      t1_scholastic_entry: t1_scholastic_entry,
    };

    const subjectTableData = {
      adm_no: adm_no,
      pen_paper_pt1: pen_paper_pt1,
      pen_paper_pt2: pen_paper_pt2,
      pen_paper_pt3: pen_paper_pt3,
      best_of_two: best_of_two,
      multiple_assessment: multiple_assessment,
      portfoilo: portfoilo,
      sub_enrich_act: sub_enrich_act,
      annual_exam: annual_exam,
      grand_total: grand_total,
      final_grade: final_grade,
    };

    const totalTableName = `${class_name}_${section}_total`;
    const subjectTableName = `${class_name}_${section}_${subject}`;

    // Check if subject table exists, if not, create it
    const subjectTableExistsQuery = `SHOW TABLES LIKE '${subjectTableName}'`;
    const [subjectTables] = await db.promise().query(subjectTableExistsQuery);

    if (subjectTables.length === 0) {
      const createSubjectTableQuery = `
      CREATE TABLE IF NOT EXISTS ${subjectTableName} (
        adm_no VARCHAR(45) PRIMARY KEY,
        pen_paper_pt1 float,
        pen_paper_pt2 float,
        pen_paper_pt3 float,
        best_of_two float,
        multiple_assessment float,
        portfoilo float,
        sub_enrich_act float,
        annual_exam float,
        grand_total float,
        final_grade varchar(45)
      )
    `;

      await db.promise().query(createSubjectTableQuery);
    }

    const subjectInsertQuery = `INSERT INTO ${subjectTableName} SET ? ON DUPLICATE KEY UPDATE ?`;
    await db
      .promise()
      .query(subjectInsertQuery, [subjectTableData, subjectTableData]);

    const totalInsertQuery = `INSERT INTO ${totalTableName} SET ? ON DUPLICATE KEY UPDATE ?`;
    await db
      .promise()
      .query(totalInsertQuery, [totalTableData, totalTableData]);

    res
      .status(200)
      .json({ success: true, message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ success: false, error });
  }
});
////////////////////////////////////////////////

router.post("/subject-sensecondary-info", async (req, res) => {
  try {
    const {
      class_name,
      subject_code,
      subject,
      examtype,
      adm_no,
      section,
      theory_max,
      theory_obtain,
      practical_max,
      practical_obtain,
      overall,
      overall_grade,
      t1_scholastic_computer,
      t1_scholastic_drawing,
      t1_scholastic_deciplin,
      t1_scholastic_gk,
      t1_scholastic_remark,
      t1_scholastic_entry,
    } = req.body;

    totalTableData = {
      adm_no: adm_no,
      [`t1_${subject}`]: overall,
      t1_grade: overall_grade,
      t1_scholastic_computer: t1_scholastic_computer,
      t1_scholastic_drawing: t1_scholastic_drawing,
      t1_scholastic_deciplin: t1_scholastic_deciplin,
      t1_scholastic_gk: t1_scholastic_gk,
      t1_scholastic_remark: t1_scholastic_remark,
      t1_scholastic_entry: t1_scholastic_entry,
    };

    const subjectTableData = {
      adm_no: adm_no,
      theory_max: theory_max,
      theory_obtain: theory_obtain,
      practical_max: practical_max,
      practical_obtain: practical_obtain,
      overall: overall,
      overall_grade: overall_grade,
    };

    const totalTableName = `${class_name}_${section}_total`;
    const subjectTableName = `${class_name}_${section}_${subject}_${subject_code}`;
    

    //   // Check if subject table exists, if not, create it
    const subjectTableExistsQuery = `SHOW TABLES LIKE '${subjectTableName}'`;
    const [subjectTables] = await db.promise().query(subjectTableExistsQuery);

    if (subjectTables.length === 0) {
      const createSubjectTableQuery = `
      CREATE TABLE IF NOT EXISTS ${subjectTableName} (
        adm_no VARCHAR(45) PRIMARY KEY,
        theory_max FLOAT,
        theory_obtain FLOAT,
        practical_max FLOAT,
        practical_obtain FLOAT,
        overall FLOAT,
        overall_grade VARCHAR(45)
      )
    `;

      await db.promise().query(createSubjectTableQuery);
    }

    const subjectInsertQuery = `INSERT INTO ${subjectTableName} SET ? ON DUPLICATE KEY UPDATE ?`;
    await db
      .promise()
      .query(subjectInsertQuery, [subjectTableData, subjectTableData]);

    const totalInsertQuery = `INSERT INTO ${totalTableName} SET ? ON DUPLICATE KEY UPDATE ?`;
    await db
      .promise()
      .query(totalInsertQuery, [totalTableData, totalTableData]);

    res
      .status(200)
      .json({ success: true, message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ success: false, error });
  }
});
/////////////////////////////////////////////////

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }

    req.user = user;
    next();
  });
}
router.post("/staff", upload.single("file"), async (req, res) => {
  try {
    let imagename = null;
    if (req.file) {
      imagename = req.file.originalname;
    }

    // Extract other form data
    const { name, email, password, phonenumber, address, branch, role, about } =
      req.body;

    // Insert data into the database
    const query =
      "INSERT INTO teacher (name, imagename, role, email, password, phone, address, branch, about) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      name,
      imagename,
      role,
      email,
      password,
      phonenumber,
      address,
      branch,
      about,
    ];

    await db.promise().query(query, values);

    // Send success response
    res
      .status(201)
      .json({ success: true, message: "Teacher created successfully" });
  } catch (error) {
    // Send error response if any error occurs
    console.error("Error creating teacher:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
