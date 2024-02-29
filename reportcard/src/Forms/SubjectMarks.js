import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SecondaryForm from "./SecondryForm"; // Corrected the import
import PrimaryForm from "./PrimaryForm";
import SeniorSecondaryForm from "./SeniorSecondryForm";
import Nursery from "./Nursery";
import { URL } from "../URL";
const SubjectMarks = () => {
  const selectedVal = useSelector(
    (state) => state.selectedValues.selectedValues
  );
  const selectedClass = selectedVal[0];
  const selectedSection = selectedVal[1];
  const selectedSubject = selectedVal[2];
  const selectedClassNumber = selectedVal[3];

  const [message, setMessage] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState("");

  const handleFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", csvFile);
      formData.append("class_name", selectedClass);
      formData.append("section_name", selectedSection);
      formData.append("subject_name", selectedSubject);
      // Append other form data as needed
      const response = await axios.post(`${URL}/admin/upload/marks`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
      setCsvFile(null); // Reset file state
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  return (
    <>
      {selectedClassNumber > 12 ? (
        <Nursery />
      ) : (
        <section className="py-1 bg-blueGray-50">
          <div className="w-full  px-4 mx-auto mt-6">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-blueGray-100 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="flex justify-between items-center ">
                  <h6 className="text-blueGray-700 text-xl font-bold lg:w-3/12">
                    Subject Marks
                  </h6>
                  <div className="grid grid-cols-3  gap-2 items-center mb-3 w-1/2">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="imagename"
                    >
                      Upload csv*
                    </label>
                    <input
                      type="file"
                      id="imagename"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="imagename"
                      className="border-2 border-dashed border-gray-500 cursor-pointer py-2 px-4 w-full text-center rounded-lg hover:bg-white"
                    >
                      {csvFile ? csvFile.name.slice(0, 23) : "Choose an csv"}
                    </label>
                    <button
                      onClick={handleFile}
                      disabled={!csvFile}
                      className={`text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 
              ${
                !csvFile
                  ? "bg-gray-300 "
                  : "hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200"
              }
              focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              {message ? (
                <div
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
                  role="alert"
                >
                  <p className="font-bold">Success!</p>
                  <p>{message}</p>
                </div>
              ) : null}
              {error && (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                  role="alert"
                >
                  <p className="font-bold">Error!</p>
                  <p>{error}</p>
                </div>
              )}
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {selectedClassNumber < 9 ? (
                  <PrimaryForm />
                ) : selectedClassNumber > 10 ? (
                  <SeniorSecondaryForm />
                ) : (
                  <SecondaryForm />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SubjectMarks;
