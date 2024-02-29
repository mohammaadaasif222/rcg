import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses } from "../redux/actions.js";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {URL} from '../URL.js'

export default function EditClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClass,setSelectedClass] = useState(null)
  const [selectedSection,setSelectedSection] = useState(null)
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [classvalue, setClassvalue] = useState([]);


  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { Allclasses, loading: classesLoading } = useSelector(
    (state) => state.Allclasses
  );
  useEffect(() => {
    dispatch(fetchClasses());
    setClasses(Allclasses);
  }, [dispatch]);

  useEffect(() => {
    if (!classesLoading) {
      setClasses(Allclasses);
      setLoading(false);
    }
  }, [Allclasses, classesLoading]);

  const getSubjectStatus = (subjectValue) => {
    return subjectValue === "yes" || subjectValue === 1
      ? "assigned"
      : "unassigned";
  };
  const handleClassClick = (className,section,classvalue) => {
    setSelectedClass(className);
    setClassvalue(classvalue)
    setSelectedSection(section)
  };
  const handleRemoveClick = async (classval,subject) => {
    try {
        const response = await axios.put(
            `${URL}/cls/redit-class`,
            {classval,selectedSection,subject}
          );
          dispatch(fetchClasses());
    } catch (error) {
      console.error("Error removing class:", error);
    }
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
        const response = await axios.put(
            `${URL}/cls/edit-class`,
            {classvalue,selectedSection,selectedSubjects}
          );
          dispatch(fetchClasses());
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
  return (

        <>
        <div className="p-3 bg-white w-full shadow-xl rounded-lg">
          <div className="modal-body flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 pr-4 mb-4 lg:mb-0 text-center lg:text-center">
              <ul className="w-full lg:w-48 text-sm font-medium shadow-xl text-gray-900 bg-gray-300 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {classes.map((classData) => (
                  <li
                    key={classData.class_name}
                    onClick={() => handleClassClick(classData.class_name ,classData.section,classData.classvalue)}
                    className={`block w-full px-4 py-2 border-b border-gray-200 cursor-pointer ${
                      selectedClass === classData.class_name && selectedSection===classData.section
                        ? "bg-gray-900 text-white focus:bg-gray-100 focus:text-blue-700"
                        : "hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                    }`}
                    aria-current={selectedClass === classData.class_name ? "true" : undefined}
                  >
                    {" "}
                    {selectedClass === classData.class_name && <span aria-hidden="true">&rarr; </span>}
                    Class {classData.class_name} {classData.section}
                  </li>
                ))}
              </ul>
            </div>
            <div className=" pl-4 p-3 bg-gray-100 text-gray-600 w-full shadow-xl rounded-lg">
              <h2>Subjects</h2>
              {selectedClass && (
  <table className="w-full border-collapse mt-4">
    <thead>
      <tr className="border-b">
        <th className="px-4 py-2 text-left bg-gray-300">Assigned</th>
        <th className="px-4 py-2 text-left bg-gray-300">Unassigned</th>
      </tr>
    </thead>
    <tbody>
      {classes
        .filter((classData) => classData.class_name === selectedClass && classData.section === selectedSection)
        .map((classData) =>
          Object.keys(classData)
            .filter((key) => key !== "class_name" && key !== "classvalue" && key !== "section" && key !== "class_id")
            .map((subject) => (
              <tr key={subject} className="border-b p-2">
                <td className="px-4 py-2">
                  {classData[subject] !== "no" && (
                    <div className="flex justify-between items-center">
                      <div
                        id={`${subject}${classData.class_name}`}
                        onClick={() => handleRemoveClick(classData.classvalue, subject)}
                        style={{ cursor: "pointer" }}
                        className="flex items-center "
                      >
                        <XMarkIcon className="h-4 w-4 mr-2 text-red-500" aria-hidden="true" />
                        {subject}
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">
                  {classData[subject] === "no" && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${subject}${classData.class_name}`}
                        checked={selectedSubjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                        className="mr-2"
                      />
                      <label htmlFor={`${subject}${classData.class_name}`}>{subject}</label>
                    </div>
                  )}
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
          </div></div>
          </>
     
  );
}
