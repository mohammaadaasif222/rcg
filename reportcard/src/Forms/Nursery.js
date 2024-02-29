import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector} from "react-redux";
import {URL} from '../URL'

const Nursery = () => {

  const selectedVal = useSelector(
    (state) => state.selectedValues.selectedValues
  );
  const selectedClass = selectedVal[0];
  const selectedSection = selectedVal[1];
  const selectedSubject = selectedVal[2];
  const selectedClassNumber = selectedVal[3];
  const [dataone, setDataone] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState();
  const [csvFile, setCsvFile] = useState(null);

  const initialValues = {
    adm_no: "",
    t1_english_pronunciation: "",
    t1_english_fluency: "",
    t1_english_comprehension: "",
    t1_english_creative_writing: "",
    t1_english_handwriting: "",
    t1_english_grammar: "",
    t1_english_spelling: "",
    t1_english_vocabulary: "",
    t1_english_conversation: "",
    t1_english_recitation: "",
    t1_english_listening_comprehension: "",
    t2_english_pronunciation: "",
    t2_english_fluency: "",
    t2_english_comprehension: "",
    t2_english_creative_writing: "",
    t2_english_handwriting: "",
    t2_english_grammar: "",
    t2_english_spelling: "",
    t2_english_vocabulary: "",
    t2_english_conversation: "",
    t2_english_recitation: "",
    t2_english_listening_comprehension: "",
    t1_punjabi_pronunciation: "",
    t1_punjabi_fluency: "",
    t1_punjabi_comprehension: "",
    t1_punjabi_creative_writing: "",
    t1_punjabi_handwriting: "",
    t1_punjabi_grammar: "",
    t1_punjabi_spelling: "",
    t1_punjabi_vocabulary: "",
    t1_punjabi_conversation: "",
    t1_punjabi_recitation: "",
    t1_punjabi_listening_comprehension: "",
    t2_punjabi_pronunciation: "",
    t2_punjabi_fluency: "",
    t2_punjabi_comprehension: "",
    t2_punjabi_creative_writing: "",
    t2_punjabi_handwriting: "",
    t2_punjabi_grammar: "",
    t2_punjabi_spelling: "",
    t2_punjabi_vocabulary: "",
    t2_punjabi_conversation: "",
    t2_punjabi_recitation: "",
    t2_punjabi_listening_comprehension: "",
    t1_mathematics_concept: "",
    t1_mathematics_activity: "",
    t1_mathematics_tables: "",
    t1_mathematics_mental_ability: "",
    t2_mathematics_concept: "",
    t2_mathematics_activity: "",
    t2_mathematics_tables: "",
    t2_mathematics_mental_ability: "",
    t1_health_environment: "",
    t1_health_sensitivity: "",
    t1_health_activity: "",
    t1_health_group_discussion: "",
    t2_health_environment: "",
    t2_health_sensitivity: "",
    t2_health_activity: "",
    t2_health_group_discussion: "",
    t1_games_enthusiasm: "",
    t1_games_discipline: "",
    t1_games_team_spirit: "",
    t1_games_talent: "",
    t2_games_enthusiasm: "",
    t2_games_discipline: "",
    t2_games_team_spirit: "",
    t2_games_talent: "",
    t1_art_interest: "",
    t1_art_creativity: "",
    t1_art_skill: "",
    t2_art_interest: "",
    t2_art_creativity: "",
    t2_art_skill: "",
    t1_music_interest: "",
    t1_music_rhythm: "",
    t1_music_melody: "",
    t2_music_interest: "",
    t2_music_rhythm: "",
    t2_music_melody: "",
    t1_personality_courteousness: "",
    t1_personality_confidence: "",
    t1_personality_care_of_belonging: "",
    t1_personality_neatness: "",
    t1_personality_regularity: "",
    t1_personality_initiative: "",
    t1_personality_self_control: "",
    t1_personality_respect: "",
    t1_personality_sharing: "",
    t2_personality_courteousness: "",
    t2_personality_confidence: "",
    t2_personality_care_of_belonging: "",
    t2_personality_neatness: "",
    t2_personality_regularity: "",
    t2_personality_initiative: "",
    t2_personality_self_control: "",
    t2_personality_respect: "",
    t2_personality_sharing: "",
  };

  const t1Fields = Object.keys(initialValues).filter((key) =>
    key.startsWith("t1_")
  );
  const t2Fields = Object.keys(initialValues).filter((key) =>
    key.startsWith("t2_")
  );

  const validationSchema = Yup.object().shape({
    // class_name: Yup.string().required("Please Select the Class"),
    // section: Yup.string().required("Please Select the Section"),
    // student_name: Yup.string().required(
    //   "Please Select from suggestion the Subject"
    // ),
    // adm_no: Yup.string().required("Please Enter Admission number"),
  });
  const handleStudent = (studentdata) => {
    formik.setFieldValue("adm_no", studentdata.adm_no);
    formik.setFieldValue("student_name", studentdata.student_name);
    setFiltered([]);
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${URL}/student/nursery`,
          values
        );

        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
          resetForm();
        }, 2000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setError(error.response.data.error);
      }
    },
  });

  const handleFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", csvFile);
      formData.append("class_name", selectedClass);
      formData.append("section_name", selectedSection);
      // Append other form data as needed
      const response = await axios.post(
        `${URL}/admin/upload/nursery-marks`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
            <form className="py-3" onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="adm_no"
                    >
                      Addmission Number
                    </label>
                    <input
                      id="adm_no"
                      type="text"
                      value={formik.values.adm_no}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        formik.touched.adm_no && formik.errors.adm_no
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {filtered.length > 0 && (
                    <div className="bg-white p-3 shadow-lg absolute z-50 w-[43%] cursor-pointer">
                      {filtered.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white mt-2 p-2 border-b-2 flex justify-between items-center"
                          onClick={() => handleStudent(item)}
                        >
                          <span className="text-xs rounded-full bg-green-100 px-3 py-2 font-semibold text-green-900 ">
                            Ad no. {item.adm_no}
                          </span>
                          <span className="uppercase text-xs rounded-full bg-green-100 px-3 py-2 font-semibold  text-green-900">
                            {" "}
                            {item.student_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {formik.touched.adm_no && formik.errors.adm_no && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.adm_no}
                    </p>
                  )}
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300 pb-6" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                TERM:1
              </h6>

              <div className="flex flex-wrap pb-10">
                {t1Fields.map((field, index) => (
                  <div key={index} className="w-full lg:w-4/12 px-4 py-3">
                    <div className="relative w-full mb-3">
                      <label
                        htmlFor={field}
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      >
                        {field.replace(/_/g, " ").substring(2)}
                      </label>
                      <select
                        id={field}
                        name={field}
                        value={formik.values[field]}
                        onChange={formik.handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="">Choose a Grade</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300 pb-6" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                TERM:2
              </h6>

              <div className="flex flex-wrap pb-10">
                {t2Fields.map((field, index) => (
                  <div key={index} className="w-full lg:w-4/12 px-4 py-3">
                    <div className="relative w-full mb-3">
                      <label
                        htmlFor={field}
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      >
                        {field.replace(/_/g, " ").substring(2)}
                      </label>
                      <select
                        id={field}
                        name={field}
                        value={formik.values[field]}
                        onChange={formik.handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="">Choose a Grade</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300 pb-6" />

              <div className="mx-3 flex justify-end">
                <button
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nursery;
