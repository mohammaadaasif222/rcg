import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import {URL} from '../URL'
export default function CreateClass() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${URL}/cls/subjects`);
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const initialValues = {
    class_name: "",
    class_section: "",
    // Set initial values for each subject dynamically
    ...subjects.reduce((acc, subject) => {
      acc[subject] = false;
      return acc;
    }, {}),
  };

  const validationSchema = Yup.object().shape({
    class_name: Yup.string().required("Class Name is required"),
    class_section: Yup.string()
      .required("Section is required")
      .min(1, "Section is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Iterate over subjects and set values to 'yes' or 'no' based on checkbox state
        subjects.forEach((subject) => {
          values[subject] = values[subject] ? "yes" : "no";
        });

        const response = await axios.post(
          `${URL}/cls/create-class`,
          values
        );
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
          resetForm();
        }, 1500);
      } catch (error) {
        setError(error.response.data.message);
        console.error("Error submitting form:", error.response.data.message);
        setTimeout(() => {
          setError("");
          resetForm()
        }, 1500);
      }
    },
  });

  const handleNewSubjectSubmit = async () => {
    try {
      if (!subjects.includes(newSubject)) {
        setSubjects([...subjects, newSubject]);
        const response = await axios.post(
          `${URL}/cls/create-newsubject`,
          { newSubject }
        );

        setNewSubject("");
      } else {
        console.error("Subject already exists");
      }
    } catch (error) {
      console.error("Error submitting new subject:", error);
    }
  };

  const handleDelSubjectSubmit = async () => {
    try {
      if (subjects.includes(newSubject)) {
        setSubjects((prevSubjects) =>
          prevSubjects.filter((subject) => subject !== newSubject)
        );

        const response = await axios.post(
          `${URL}/cls/delete-subject`,
          { newSubject }
        );

        setNewSubject("");
      } else {
        console.error("Subject not found");
      }
    } catch (error) {
      console.error("Error deleteing subject:", error);
    }
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full  px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Create Class
              </h6>
            </div>
            <div className="mx-3 flex justify-end">
              <Link to="/editclasses">
                <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  Edit Classes
                </button>
              </Link>
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
          ) : error ? (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
              role="alert"
            >
              <p className="font-bold">Error!</p>
              <p>{error}</p>
            </div>
          ) : (
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form className="py-3" onSubmit={formik.handleSubmit}>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="class_name"
                      >
                        Select class
                      </label>
                      <select
                        id="class_name"
                        value={formik.values.class_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option disabled selected value="">
                          choose an option
                        </option>
                        <option value="prenursery_15">Pre Nursery</option>
                        <option value="nursery_14">Nursery</option>
                        <option value="kg_13">KG</option>
                        <option value="first_1">1</option>
                        <option value="second_2">2</option>
                        <option value="third_3">3</option>
                        <option value="fourth_4">4</option>
                        <option value="fifth_5">5</option>  
                        <option value="sixth_6">6</option>  
                        <option value="seventh_7">7</option>  
                        <option value="eighth_8">8</option>  
                        <option value="ninth_9">9</option>
                        <option value="ten_10">10</option>
                        <option value="eleven_11">11</option>
                        <option value="twelth_12">12</option>
                      </select>
                    </div>
                    {formik.touched.class_name && formik.errors.class_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.class_name}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="class_section"
                      >
                        Select Section
                      </label>
                      <select
                        id="class_section"
                        value={formik.values.class_section}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option disabled selected value="">
                          choose an option
                        </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                    {formik.touched.class_section &&
                      formik.errors.class_section && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.class_section}
                        </p>
                      )}
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Select Subjects
                </h6>
                <div className="flex flex-wrap">
                  {subjects.map((subject) => (
                    <div key={subject} className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3 flex justify-around items-center">
                        <label
                          className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor={subject}
                        >
                          {subject}
                        </label>
                        <input
                          type="checkbox"
                          id={subject}
                          checked={formik.values[subject]}
                          onChange={(e) =>
                            formik.setFieldValue(subject, e.target.checked)
                          }
                          onBlur={formik.handleBlur}
                          className={`shadow-md rounded-lg  ${
                            formik.touched[subject] && formik.errors[subject]
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {formik.touched[subject] && formik.errors[subject] && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors[subject]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
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
          )}

          <div className="w-full lg:w-8/12 px-4">
            <div className="relative w-full mb-3">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="new_subject"
                  >
                    Create New Subject
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="new_subject"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    <button
                      type="button"
                      onClick={handleNewSubjectSubmit}
                      className="ml-2 bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={handleDelSubjectSubmit}
                      className="ml-2 bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    >
                      Delete Subject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
