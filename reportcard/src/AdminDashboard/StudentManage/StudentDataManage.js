import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchStudentData,
  updateStudent,
} from "../../redux/actions";
import "./StudentTable.css"; // Import the CSS file for styling
import { useSelector } from "react-redux";

const StudentTable = ({ studentData, fetchStudentData, updateStudent }) => {
  const selectedVal = useSelector(
    (state) => state.selectedValues.selectedValues
  );
  const selectedClass = selectedVal[0];
  const selectedSection = selectedVal[1];
  const [editableStudents, setEditableStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editableModalData, setEditableModalData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [seeAll, setSeeAll] = useState(false);
  useEffect(() => {
    fetchStudentData(selectedClass, selectedSection);
  }, [fetchStudentData, selectedClass, selectedSection]);

  useEffect(() => {
    if (studentData.length > 0) {
      setEditableStudents(studentData.map(() => ({ id: null, values: {} })));
    }
  }, [studentData]);

  const desiredColumns = [
    "Roll_No",
    "adm_no",
    "student_name",
    "gender",
    "date_of_birth",
    "gurdian_name",
    "mother_name",
  ];

  const additionalInfoColumns = [
    "address",
    "phone",
    "attendance_term_1",
    "max_meeting_term_1",
    "attendance_term_2",
    "max_meeting_term_2",
    "height",
    "weight",
    "Blood_Group",
    "vision_l",
    "vision_r",
    "Dental_Hygine",
    "admin_category",
    "Resvreservation_category_Cat",
    "sgc",
    "bpl",
    "diffrently_abled",
    "teacher_ward",
    "religion",
    "quota",
    "date_of_admission",
    "tc_issued",
    "remarks",
  ];

  const handleNameClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleEdit = (student, index) => {
    const newEditableStudents = [...editableStudents];
    newEditableStudents[index] = { id: student.id, values: { ...student } };
    setEditableStudents(newEditableStudents);
  };

  const handleSave = async (index) => {
    try {
      const updatedStudent = await updateStudent(
        editableStudents[index].values,
        selectedClass,
        selectedSection
      );

      if (updatedStudent) {
        const userConfirmed = window.confirm(
          "Student data updated successfully. "
        );

        if (userConfirmed) {
          fetchStudentData(selectedClass, selectedSection);
        }
      } else {
        window.alert("Failed to update student data");
      }

      const newEditableStudents = [...editableStudents];
      newEditableStudents[index] = { id: null, values: {} };
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

  const handleModalEdit = () => {
    setEditableModalData({ ...selectedStudent });
  };

  const handleModalSave = async (student) => {
    try {
      const updatedModalData = await updateStudent(
        editableModalData,
        selectedClass,
        selectedSection
      );

      if (updatedModalData.success) {
        const userConfirmed = window.confirm(
          "Student data updated successfully."
        );

        if (userConfirmed) {
          fetchStudentData(selectedClass, selectedSection);
        }
      } else {
        window.alert("Failed to update student data");
      }

      const newEditableStudents = [...editableStudents];
      const modalIndex = newEditableStudents.findIndex(
        (student) => student.id === editableModalData.id
      );

      newEditableStudents[modalIndex] = { id: null, values: {} };
      setEditableStudents(newEditableStudents);
      setEditableModalData(null);
    } catch (error) {
      console.error("Error handling modal save:", error);
    }
  };

  const handleModalCancel = () => {
    setEditableModalData(null);
  };

  const ROWS_PER_PAGE = 8;

  const renderTable = (columns, heading) => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = seeAll ? studentData.length : startIndex + ROWS_PER_PAGE;
    const currentRows = seeAll
      ? studentData
      : studentData.slice(startIndex, endIndex);

    return (
      <div className="student-marks-table-container shadow-xl rounded-lg capitalize">
        <table className="w-full text-sm text-left rtl:text-right text-white-100">
          <thead>
            <tr>
              {desiredColumns.map((column, index) => (
                <th key={index} className="border border-gray-400 py-2 px-4">
                  {column}
                </th>
              ))}
              <th className="border border-gray-400 py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student, index) => (
              <tr
                key={student.id}
                className={index % 2 === 0 ? "bg-gray-600" : ""}
              >
                {desiredColumns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-400 py-2 px-4"
                  >
                    {editableStudents[index]?.id === student.id ? (
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
                    ) : column === "student_name" ? (
                      <span
                        className="cursor-pointer text-gray-900 uppercase text-bold"
                        onClick={() => handleNameClick(student)}
                      >
                        {student[column]}
                      </span>
                    ) : (
                      (student && student[column]) || ""
                    )}
                  </td>
                ))}
                <td className="border border-gray-400 py-2 px-4">
                  {editableStudents[index]?.id === student.id ? (
                    <>
                      <button
                        onClick={() => handleSave(index)}
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
                    <button
                      onClick={() => handleEdit(student, index)}
                      className="bg-blue-500 text-white px-2 py-1"
                    >
                      Edit
                    </button>
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
              { length: Math.ceil(studentData.length / ROWS_PER_PAGE) },
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
      <div className="container mx-auto mt-8 ">
       

        {renderTable()}
      </div>
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold">
                {selectedStudent.student_name} Biodata
              </h2>
              <div className="mt-6 text-right">
                {editableModalData !== null ? (
                  <>
                    <button
                      onClick={() => handleModalSave(studentData)}
                      className="bg-green-500 text-white px-2 py-1 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleModalCancel}
                      className="bg-red-500 text-white px-2 py-1"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleModalEdit}
                    className="bg-blue-500 text-white px-2 py-1"
                  >
                    Edit
                  </button>
                )}
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="mt-6 border-t border-gray-100 capitalize">
              <div className="grid grid-cols-2 gap-4">
                {additionalInfoColumns.map((column, index) => (
                  <div key={index} className="border-b border-gray-200">
                    <div className="py-2 px-4 font-semibold text-gray-500">
                      {column.replace(/_/g, " ")}
                    </div>
                    <div className="py-2 px-4">
                      {editableModalData !== null &&
                      editableModalData.hasOwnProperty(column) ? (
                        <input
                          value={editableModalData[column] || ""}
                          onChange={(e) =>
                            setEditableModalData({
                              ...editableModalData,
                              [column]: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      ) : (
                        selectedStudent[column]
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};

const mapStateToProps = (state) => ({
  studentData: state.student.students || { students: [], headings: [] },
});

export default connect(mapStateToProps, { fetchStudentData, updateStudent })(
  StudentTable
);
