import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchStudentMarks, updateStudentMarks } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";


const StudentMarksSenSec = ({ marks, fetchStudentMarks, updateStudentMarks }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [seeAll, setSeeAll] = useState(false);
  const [editableStudents, setEditableStudents] = useState([]);
  const dispatch = useDispatch();
  const selectedVal = useSelector(
    (state) => state.selectedValues.selectedValues
  );
  const selectedClass = selectedVal[0];
  const selectedSection = selectedVal[1];
  const selectedSubject = selectedVal[2];

  useEffect(() => {
    fetchStudentMarks(selectedClass, selectedSubject, selectedSection);
  }, [selectedClass, selectedSubject, fetchStudentMarks, selectedSection]);

  useEffect(() => {
    if (marks.length > 0) {
      setEditableStudents(marks.map(() => ({ id: null, values: {} })));
    }
  }, [marks]);

  const handleEdit = (student, index) => {
    const newEditableStudents = [...editableStudents];
    newEditableStudents[index] = { id: student.id, values: { ...student } };
    setEditableStudents(newEditableStudents);
  };

  const handleSave = async (index, student) => {
    try {
      const editable = editableStudents[index];
  
      const Fields = Object.entries(editable.values)
        .filter(([key, value]) => value !== student[key])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
  
      const updatedStudent = await updateStudentMarks(
        Fields,
        selectedClass,
        selectedSubject,
        student.adm_no,
        selectedSection
      );
  
      if (updatedStudent) {
        const userConfirmed = window.confirm(
          "Student data updated successfully."
        );
  
        if (userConfirmed) {
          fetchStudentMarks(selectedClass, selectedSubject, selectedSection);
        }
      } else {
        window.alert("Failed to update student data");
      }
  
      // Make dependent fields non-editable
      const newEditableStudents = [...editableStudents];
      newEditableStudents[index] = { id: null, values: {} };

      // Update Best of Two if editing Term 1 or Term 2
      if (activeTab === 1 || activeTab === 2) {
        const term1Index = tabColumns.indexOf("best_of_two");

        if (activeTab === 1) {
          newEditableStudents[index].values[tabColumns[term1Index]] =
            student[tabColumns[term1Index]];
        } 
      }

      // Make Total Marks non-editable if editing Scholastic Term 1 or Term 2

      setEditableStudents(newEditableStudents);
    } catch (error) {
      console.error("Error handling save:", error);
    }
  };

  

  const handleCancel = (index) => {
    const newEditableStudents = [...editableStudents];
    newEditableStudents[index] = { id: null, values: {} };
    setEditableStudents(newEditableStudents);
  };

  const tabheading = [
    "Roll No",
    "Name",
    "theory max",
    "theory obtain",
    "practical max",
    "practical obtain",
    "overall",
    "overall grade",
  ];

  const tabColumns = [
   "Roll_No",
    "student_name",
    "theory_max",
    "theory_obtain",
    "practical_max",
    "practical_obtain",
    "overall",
    "overall_grade",
  ];



  const ROWS_PER_PAGE = 8;

  const renderTable = (columns, heading) => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = seeAll ? marks.length : startIndex + ROWS_PER_PAGE;
    const currentRows = seeAll ? marks : marks.slice(startIndex, endIndex);

    return (
      <div className="student-marks-table-container shadow-xl rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-white-100">
          <thead className="text-xs text-white uppercase bg-gray-600 dark:text-white">
            <tr>
              {heading.map((column, index) => (
                <th key={index} className="px-6 py-3" scope="col">
                  {column}
                </th>
              ))}
              <th className="px-6 py-3" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student, index) => (
              <tr
                className="bg-gray-500 text-white border-b border-gray-400"
                key={student.id}
              >
                {columns.map((column) => (
                  <td key={column} className="px-6 py-4">
                    {editableStudents[index]?.id === student.id ? (
                      column === "Roll_No" || column === "student_name" ||
                      column === "marks(100)" || column === "final_grade_term_1" ||
                      column === "marks(100)" || column === "final_grade_term_2" ||
                      column === "best_of_two_term1" || column === "best_of_two_term2" ||
                      column === "total_marks_term_1" || column === "total_marks_term_2" ? (
                        <span>{student[column]}</span>
                      ) : (
                        <input
                          value={
                            (editableStudents[index]?.values &&
                              editableStudents[index]?.values[column]) ||
                            ""
                          }
                          onChange={(e) => {
                            const newEditableStudents = [...editableStudents];
                            newEditableStudents[index].values[column] =
                              e.target.value;
                            setEditableStudents(newEditableStudents);
                          }}
                          className="w-full text-gray-900"
                        />
                      )
                    ) : column === "name" ? (
                      <span className="cursor-pointer text-gray-900 uppercase text-bold">
                        {student[column]}
                      </span>
                    ) : (
                      <span>{student[column]}</span>
                    )}
                  </td>
                ))}


                <td className="px-6 py-4">
                  {editableStudents[index]?.id === student.id ? (
                    <>
                      <button
                        onClick={() => handleSave(index, student)}
                        className="bg-green-500 text-white px-2 py-1 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleCancel(index)}
                        className="bg-red-500 text-white px-2 py-1"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => handleEdit(student, index)}
                        className="bg-blue-500 text-white px-2 py-1"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!seeAll && (
          <div className="student-marks-pagination-container">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from(
              { length: Math.ceil(marks.length / ROWS_PER_PAGE) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              )
            )}

            <button onClick={() => setSeeAll(true)}>See All</button>
          </div>
        )}

        {seeAll && (
          <div className="student-marks-pagination-container">
            <button onClick={() => setSeeAll(false)}>
              Back to Paginated View
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="container bg-white p-3 mt-2 mb-6 shadow-xl rounded-lg hidden md:block">
        <div className="flex items-center justify-between border-b mb-4">
          <div className="flex space-x-4 student-marks-pagination-container">
            <button
              className={`mr-6 cursor-pointer ${
                activeTab === 1 ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveTab(1)}
            >
              Term1
            </button>
          
          </div>
        </div>

        {activeTab === 1 && renderTable(tabColumns, tabheading)}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  marks: state.marks.marks || [],
});

const mapDispatchToProps = {
  fetchStudentMarks,
  updateStudentMarks,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentMarksSenSec);
