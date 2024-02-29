import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { fetchClasses, updateClasses,removeClass } from "../../redux/actions";
import { useDispatch } from "react-redux";

function TeacherClassesModal({
  Allclasses,
  selectedTeacher,
  data,
  setJsonData,
  onClose,
  teacherData,
  selectedTeacherName,
}) {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    setJsonData(Allclasses);
  }, [Allclasses, setJsonData]);

  const handleClassClick = (className,Section) => {
    setSelectedClass(className);
    setSelectedSection(Section);
    setSelectedSubjects([]);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.includes(subject)
        ? prevSubjects.filter((prevSubject) => prevSubject !== subject)
        : [...prevSubjects, subject]
    );
  };

  const sendDataToBackend = async () => {
    try {
      await dispatch(updateClasses(selectedTeacher, selectedClass, selectedSubjects,selectedSection));
        dispatch(fetchClasses())
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const handleRemoveClick = async (subject) => {
    try {
      await dispatch(removeClass(selectedTeacher, selectedClass, subject));
        dispatch(fetchClasses())
    } catch (error) {
      console.error("Error removing class:", error);
    }
  };

  return (
    <>
<div className="modal-overlay">
  <div className="modal">
    <div className="modal-header">
      <h2>{selectedTeacherName} Assigned Classes</h2>
      <button onClick={onClose}>Close</button>
    </div>
    <div className="modal-body flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 pr-4 mb-4 lg:mb-0 text-center lg:text-center">
        <ul className="w-full lg:w-48 text-sm font-medium shadow-xl text-gray-900 bg-gray-300 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {data.map((classData) => (
            <li
              key={classData.class_name}
              onClick={() => handleClassClick(classData.class_name,classData.section)}
              className={`block w-full px-4 py-2 border-b border-gray-200 cursor-pointer ${
                selectedClass === classData.class_name && selectedSection=== classData.section
                  ? "bg-gray-900 text-white focus:bg-gray-100 focus:text-blue-700"
                  : "hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              }`}
              aria-current={selectedClass === classData.class_name ? "true" : undefined}
            >
              {" "}
              {selectedClass === classData.class_name && <span aria-hidden="true">&rarr; </span>}
              Class {classData.class_name} - {classData.section}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full pl-4 p-3 bg-gray-300 w-full shadow-xl rounded-lg">
        <h2>Subjects</h2>
        {selectedClass && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th>Unassigned</th>
                <th>Assigned</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((classData) => classData.class_name === selectedClass && classData.section===selectedSection)
                .map((classData) =>
                  Object.keys(classData)
                    .filter((key) => key !== "class_name" && key !== "classvalue" && key !== "class_id" && key !== "section" && classData[key] !== "no")
                    .map((subject) => (
                      <tr key={subject} className="subject-info border-b p-2">
                        <td>
                          {classData[subject] === "yes" && (
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`${subject}${classData.class_name}`}
                                checked={selectedSubjects.includes(subject)}
                                onChange={() => handleSubjectChange(subject)}
                              />
                              <label
                                htmlFor={`${subject}${classData.class_name}`}
                                className="ml-2"
                              >
                                {subject}
                              </label>
                            </div>
                          )}
                        </td>
                        <td>
                          {classData[subject] !== "yes" && (
                            <div className="flex justify-around items-center">
                              <div
                                id={`${subject}${classData.class_name}`}
                                onClick={() => handleRemoveClick(subject)}
                                style={{ cursor: "pointer" }}
                                className="flex "
                              >
                                <XMarkIcon
                                  className="h-4 w-4 text-red-500"
                                  aria-hidden="true"
                                />
                              </div>
                              {classData[subject] !== "yes" && classData[subject] !== "no" && (
                                <span>{subject}</span>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          <span>
                            {" "}
                            {teacherData.find(
                              (teacher) => teacher.teacher_id == classData[subject]
                            )?.name || "None"}
                          </span>
                        </td>
                      </tr>
                    ))
                )}
            </tbody>
          </table>
        )}
        <div className="modal-footer mt-4">
          {" "}
          <button
            onClick={() => sendDataToBackend()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
const mapStateToProps = (state) => ({
  Allclasses: state.Allclasses.Allclasses || [],
});

const mapDispatchToProps = {
  fetchClasses,
  updateClasses,
  removeClass,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassesModal);