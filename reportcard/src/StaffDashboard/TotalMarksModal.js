import React, { useState } from "react";
import ReportCard from "./ReportCard";
import {URL} from '../URL'
import TermoneReportCard from "./TermoneReportCard";

import axios from "axios";

const TotalMarksModal = ({
  data,
  selectedStudent,
  selectedClass,
  selectedSection,
  adm_no,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [reportCardData, setReportCardData] = useState(null);
  const [termonereportCardData, setTermoneReportCardData] = useState(null);

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
          "t1_scholastic_entery",
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
        "t1_scholastic_entery",
      ].includes(key)
  );

  const tab2 = Object.keys(data[0]).filter(
    (key) =>
      key.startsWith("t2_") &&
      ![
        "t2_scholastic_workeducation",
        "t2_scholastic_art",
        "t2_scholastic_health",
        "t2_scholastic_deciplin",
        "t2_scholastic_remark",
        "t2_scholastic_entery",
      ].includes(key)
  );

  const tab3Columns = [
    "t1_scholastic_computer",
    "t1_scholastic_drawing",
    "t1_scholastic_gk",
    "t1_scholastic_deciplin",
    "t1_scholastic_remark",
    "t1_scholastic_entery",
  ];
  const tab3heading = [
    "computer",
    "drwaing",
    "gk",
    "deciplin",
    "remark",
    "entery",
  ];
  const tab4Columns = [
    "t2_scholastic_workeducation",
    "t2_scholastic_art",
    "t2_scholastic_health",
    "t2_scholastic_deciplin",
    "t2_scholastic_remark",
    "t2_scholastic_entery",
  ];
  const tab4heading = [
    "work education",
    "art",
    "health",
    "deciplin",
    "remark",
    "entery",
  ];

  const handleReportCardClick = async (adm_no) => {
    try {
      const apiUrl = `${URL}/student/reportcard/${selectedClass}/${selectedSection}/${selectedStudent.adm_no}`;
      const response = await axios.get(apiUrl);
      console.log(response.data);
      setReportCardData(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleTermoneReportCardClick = async (adm_no) => {
    try {
      const apiUrl = `${URL}/student/reportcard/${selectedClass}/${selectedSection}/${selectedStudent.adm_no}`;
      const response = await axios.get(apiUrl);
      console.log(response.data);
      setTermoneReportCardData(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const closeReportCardModal = () => {
    setReportCardData(null);
    setTermoneReportCardData(null);
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
            <button
              onClick={() =>
                handleTermoneReportCardClick(selectedStudent.adm_no)
              }
              className="bg-blue-500 text-white px-2 py-1"
            >
              Term 1 Report Card
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
                Term 1 Marks Detail
              </button>
              <button
                className={`mr-6 cursor-pointer ${
                  activeTab === 2 ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab(2)}
              >
                Term 2 Marks Detail
              </button>
              <button
                className={`cursor-pointer  ${
                  activeTab === 3 ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab(3)}
              >
                scholastic Term 1
              </button>
              <button
                className={`cursor-pointer  ${
                  activeTab === 4 ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab(4)}
              >
                scholastic Term 2
              </button>
            </div>
            {activeTab === 1 && renderTable(data, tab1, tabheading)}
            {activeTab === 2 && renderTable(data, tab2, tabheading)}
            {activeTab === 3 && renderTable(data, tab3Columns, tab3heading)}
            {activeTab === 4 && renderTable(data, tab4Columns, tab4heading)}
          </div>
        </div>
      </div>

      {termonereportCardData && (
        <>
          <TermoneReportCard
            data={data}
            selectedStudent={selectedStudent}
            termonereportCardData={termonereportCardData}
            closeReportCardModal={closeReportCardModal}
          />
        </>
      )}

      {reportCardData && (
        <>
          <ReportCard
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

export default TotalMarksModal;
