import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchStudentData } from "../redux/actions";
import "../AdminDashboard/StudentManage/StudentTable.css";
import { useSelector, useDispatch } from "react-redux";
import TotalMarksModal from "./TotalMarksModal";
import TotalMarksModalSec from "./TotalMarksModalSec";
import TotalMarksModalSenSec from "./TotalMarksModalSenSec";
import PrimaryTermOneReport from "./PrimaryTermOneReport";
import PrimaryTermTwoReport from "./PrimaryTermTwoReport";
import {URL} from '../URL'

import axios from "axios";
import NoData from "./NoReport";

const TotalMarks = ({ studentData, fetchStudentData }) => {
  const [totalmodalData, setTotalModalData] = useState();
  const [selectedStudent, setSelectedStudent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [seeAll, setSeeAll] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [primaryData, setPrimaryData] = useState(false);
  const [primaryDataTermone, setPrimaryDataTermone] = useState(false);

  
  const dispatch = useDispatch();
  const selectedVal = useSelector(
    (state) => state.selectedValues.selectedValues
  );
  const selectedClass = selectedVal[0];
  const selectedSection = selectedVal[1];

  useEffect(() => {
    fetchStudentData(selectedClass, selectedSection);
  }, [fetchStudentData, selectedClass, selectedSection]);
  const desiredColumns = ["Roll_No", "adm_no", "student_name", "gender"];

  const handlePreviewClick = async (adm_no) => {
    try {
      const apiUrl = `${URL}/student/totalmarks/${selectedClass}/${selectedSection}/${adm_no}`;
      const response = await axios.get(apiUrl);
      if (response.data) {
        setTotalModalData(response.data);
        if (response.data?.length == 0) {
          setCheckData(true);
        }
        setSelectedStudent(
          studentData.find((student) => student.adm_no == adm_no)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePrimaryReportClick = async (adm_no,term) => {
    try {
      const apiUrl = `${URL}/student/primarygrade/${selectedClass}/${adm_no}`;
      const response = await axios.get(apiUrl);
      if (response.data) {
        if (term==1){
          setPrimaryDataTermone(response.data)
        }
        else{
          setPrimaryData(response.data);
        }
        if (response.data?.length == 0) {
          setCheckData(true);
        }
        setSelectedStudent(
          studentData.find((student) => student.adm_no == adm_no)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const closeModal = () => {
    setTotalModalData(null);
    setPrimaryData(null);
    setPrimaryDataTermone(null);
  };
  const closeModal2 = () => {
    setCheckData(false);
  };

  ////////////////////////////

  const ROWS_PER_PAGE = 8;

  const renderTable = (columns, heading) => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = seeAll ? studentData.length : startIndex + ROWS_PER_PAGE;
    const currentRows = seeAll
      ? studentData
      : studentData.slice(startIndex, endIndex);

    return (
      <div className="student-marks-table-container shadow-xl rounded-lg">
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
                    {student[column]}
                  </td>
                ))}
                <td className="border border-gray-400 py-2 px-4">
                  {selectedClass === "nursery" ||
                  selectedClass === "kg" ||
                  selectedClass === "prenursery" ? (
                    <>
                      <button
                        onClick={() => handlePrimaryReportClick(student.adm_no,1)}
                        className="bg-blue-500 text-white px-2 py-1"
                      >
                        Term 1 Report
                      </button>
                      <button
                        onClick={() => handlePrimaryReportClick(student.adm_no,2)}
                        className="bg-blue-500 text-white px-2 py-1 ml-2"
                      >
                        Report Card
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handlePreviewClick(student.adm_no)}
                      className="bg-blue-500 text-white px-2 py-1"
                    >
                      Preview
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
      {primaryData?.length > 0 ? (
        <PrimaryTermTwoReport
          data={primaryData}
          selectedStudent={selectedStudent}
          selectedClass={selectedClass}
          onClose={closeModal}
        />
      ) : (
        checkData && <NoData closeModal2={closeModal2} />
      )}


{primaryDataTermone?.length > 0 ? (
        <PrimaryTermOneReport
          data={primaryDataTermone}
          selectedStudent={selectedStudent}
          selectedClass={selectedClass}
          onClose={closeModal}
        />
      ) : (
        checkData && <NoData closeModal2={closeModal2} />
      )}

      <div className="container mx-auto mt-8">{renderTable()}</div>
      {selectedClass === "ninth" || selectedClass === "ten" ? (
        totalmodalData?.length > 0 ? (
          <TotalMarksModalSec
            data={totalmodalData}
            selectedStudent={selectedStudent}
            selectedClass={selectedClass}
            selectedSection={selectedSection}
            onClose={closeModal}
          />
        ) : (
          checkData && <NoData closeModal2={closeModal2} />
        )
      ) : selectedClass === "eleven" || selectedClass === "twelth" ? (
        totalmodalData?.length > 0 ? (
          <TotalMarksModalSenSec
            data={totalmodalData}
            selectedStudent={selectedStudent}
            selectedClass={selectedClass}
            selectedSection={selectedSection}
            onClose={closeModal}
          />
        ) : (
          checkData && <NoData closeModal2={closeModal2} />
        )
      ) : totalmodalData?.length > 0 ? (
        <TotalMarksModal
          data={totalmodalData}
          selectedStudent={selectedStudent}
          selectedClass={selectedClass}
          selectedSection={selectedSection}
          onClose={closeModal}
        />
      ) : (
        checkData && <NoData closeModal2={closeModal2} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  studentData: state.student.students || { students: [], headings: [] },
});

export default connect(mapStateToProps, { fetchStudentData })(TotalMarks);
