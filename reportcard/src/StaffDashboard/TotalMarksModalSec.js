import React, { useState } from "react";
import ReportCardTwo from "./ReportcardTwo";
import {URL} from '../URL'

import axios from "axios";

const TotalMarksModalSec = ({
  data,
  selectedStudent,
  selectedClass,
  selectedSection,

  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [reportCardData, setReportCardData] = useState(null);

  const tabheading = Object.keys(data[0])
    .filter(
      (key) =>
        key.startsWith("t1_") &&
        ![
          "t1_scholastic_computer",
          "t1_scholastic_drawing",
          "t1_scholastic_gk",
          "t1_scholastic_deciplin",
          "t1_scholastic_remark",
          "t1_scholastic_entry",
          "t1_scholastic_art",
          "t1_scholastic_health",
          "t1_scholastic_workeducation",
          
        ].includes(key)
    )
    .map((key) => key.slice(3));

  const tab1 = Object.keys(data[0]).filter(
    (key) =>
      key.startsWith("t1_") &&
      ![
        "t1_scholastic_computer",
        "t1_scholastic_drawing",
        "t1_scholastic_gk",
        "t1_scholastic_deciplin",
        "t1_scholastic_remark",
        "t1_scholastic_entry",
        "t1_scholastic_art",
        "t1_scholastic_health",
        "t1_scholastic_workeducation",
      ].includes(key)
  );



  const tab2Columns = [
"t1_scholastic_art",
"t1_scholastic_computer",
"t1_scholastic_deciplin",
"t1_scholastic_drawing",
"t1_scholastic_entry",
"t1_scholastic_gk",
"t1_scholastic_health",
"t1_scholastic_remark",
"t1_scholastic_workeducation",
  ];
  const tab2heading = [
    "scholastic art",
    "scholastic computer",
    "scholastic deciplin",
    "scholastic drawing",
    "scholastic entry",
    "scholastic gk",
    "scholastic health",
    "scholastic remark",
    "scholastic workeducation",
  ];


  const handleReportCardClick = async (adm_no) => {
    try {
        const Section=selectedSection.toLowerCase()
      const apiUrl = `${URL}/student/reportcardtwo/${selectedClass}/${Section}/${selectedStudent.adm_no}`;
      const response = await axios.get(apiUrl);
      console.log(response.data);
      setReportCardData(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const closeReportCardModal = () => {
    setReportCardData(null);
  };

  const renderTable = (data, columns, heading) => {
    if (!Array.isArray(data)) {
      console.error("Invalid data format. Expected an array.");
      return null;
    }
console.log(selectedClass);
    return (
      <div>
        <table className="w-full text-sm text-center text-gray-900 shadow-xl rounded-lg">
          <thead className="text-xs text-gray-900 uppercase">
            <tr>
              {heading.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-gray-900"
                  scope="col"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr
                className="bg-gray-200 text-gray-900"
                key={student.id || index}
              >
                {columns.map((column) => (
                  <td key={column} className="px-6 py-4">
                    <span>{student[column]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  console.log(reportCardData,data)
  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>{data[0].Student_name} Marks Details</h2>
            <button
              onClick={() => handleReportCardClick(selectedStudent.adm_no)}
              className="bg-blue-500 text-white px-2 py-1"
            >
              Report Card
            </button>
            <button onClick={onClose}>Close</button>
          </div>
          <div className="modal-body">
            <div className="flex space-x-4 student-marks-pagination-container">
              <button
                className={`mr-6 cursor-pointer ${
                  activeTab === 1 ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab(1)}
              >
                Marks Detail
              </button>
              <button
                className={`cursor-pointer  ${
                  activeTab === 2 ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab(2)}
              >
                scholastic
              </button>             
            </div>
            {activeTab === 1 && renderTable(data, tab1, tabheading)}
            {activeTab === 2 && renderTable(data, tab2Columns, tab2heading)}
            
          </div>
        </div>
      </div>
      {reportCardData && (
        <>
     
                  <ReportCardTwo
                    data={data}
                    selectedStudent={selectedStudent}
                    reportCardData={reportCardData}
                    closeReportCardModal={closeReportCardModal}
                  />
              
        </>
      )}
    </>
  );
};

export default TotalMarksModalSec;
