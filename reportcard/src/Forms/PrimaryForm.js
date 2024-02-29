import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL } from "../URL";

const PrimaryForm = () => {
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

  const initialValues = {
    class_name: "",
    student_name: "",
    subject: "",
    adm_no: 0,
    section: "",
    pen_paper_term1_pt1: 0,
    t1_scholastic_computer: "",
    t1_scholastic_drawing: "",
    t1_scholastic_deciplin: "",
    t1_scholastic_gk: "",
    t1_scholastic_remark: "",
    t1_scholastic_entery: "",
    pen_paper_term1_pt2: 0,
    pen_paper_term1_pt3: 0,
    multiple_assessment_term1_pt1: 0,
    multiple_assessment_term1_pt2: 0,
    multiple_assessment_term1_pt3: 0,
    best_of_two_term1: 0,
    weightage_term1: 0,
    portfoilo_term1: 0,
    sub_enrich_act_term1: 0,
    total_marks_term_1: 0,
    final_grade_term_1: 0,
    hly_exam_term1: 0,

    pen_paper_term2_pt1: 0,
    pen_paper_term2_pt2: 0,
    pen_paper_term2_pt3: 0,
    t2_scholastic_workeducation: "",
    t2_scholastic_art: "",
    t2_scholastic_health: "",
    t2_scholastic_deciplin: "",
    t2_scholastic_entery: "",
    t2_scholastic_remark: "",
    multiple_assessment_term2_pt1: 0,
    multiple_assessment_term2_pt2: 0,
    multiple_assessment_term2_pt3: 0,
    best_of_two_term2: 0,
    weightage_term2: 0,
    portfoilo_term2: 0,
    sub_enrich_act_term2: 0,
    annual_exam: 0,
    total_marks_term_2: 0,
    final_grade_term_2: 0,
  };

  const validationSchema = Yup.object().shape({
    class_name: Yup.string().required("Please Select the Class"),
    section: Yup.string().required("Please Select the Section"),
    subject: Yup.string().required("Please Select the Subject"),
    student_name: Yup.string().required(
      "Please Select from suggestion the Subject"
    ),
    adm_no: Yup.string().required("Please Enter Admission number"),
    pen_paper_term1_pt1: Yup.string(),
    pen_paper_term1_pt2: Yup.string(),
    pen_paper_term1_pt3: Yup.string(),
    multiple_assessment_term1_pt1: Yup.string(),
    multiple_assessment_term1_pt2: Yup.string(),
    multiple_assessment_term1_pt3: Yup.string(),
    best_of_two_term1: Yup.string(),
    weightage_term1: Yup.string(),
    portfoilo_term1: Yup.string(),
    sub_enrich_act_term1: Yup.string(),
    hly_exam_term1: Yup.string(),
    pen_paper_term2_pt1: Yup.string(),
    pen_paper_term2_pt2: Yup.string(),
    pen_paper_term2_pt3: Yup.string(),
    multiple_assessment_term2_pt1: Yup.string(),
    multiple_assessment_term2_pt2: Yup.string(),
    multiple_assessment_term2_pt3: Yup.string(),
    best_of_two_term2: Yup.string(),
    weightage_term2: Yup.string(),
    portfoilo_term2: Yup.string(),
    sub_enrich_act_term2: Yup.string(),
    annual_exam: Yup.string(),
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
        const response = await axios.post(`${URL}/admin/subject-info`, values);

        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
          resetForm();
        }, 2000);
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
          resetForm();
        }, 2000);
        console.error("Error submitting form:", error);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("class_name", selectedClass);
    formik.setFieldValue("section", selectedSection);
    formik.setFieldValue("subject", selectedSubject);

    const fetchBiodata = async () => {
      if (selectedClass && selectedSection) {
        const tableName = `${selectedClass}_${selectedSection.toLowerCase()}_biodata`;
        try {
          const response = await axios.get(`${URL}/studentdata/${tableName}`);

          setDataone(response.data.results);
        } catch (error) {
          setError("No data found for this class");
          setTimeout(() => {
            setError("");
          }, 3000);
          console.error("Error fetching biodata:", error);
        }
      }
    };
    fetchBiodata();
    if (formik.values.adm_no && dataone) {
      const newFiltered = dataone.filter((item) =>
        item.adm_no.includes(formik.values.adm_no.toString())
      );
      setFiltered(newFiltered);
    } else {
      setFiltered([]);
    }
    const calculateTotal = () => {
      const weightageSum1 = Number(formik.values.weightage_term1) || 0;
      const subEnrichActSum1 = Number(formik.values.sub_enrich_act_term1) || 0;
      const portfolioSum1 = Number(formik.values.portfoilo_term1) || 0;
      const hlyExamSum1 = Number(formik.values.hly_exam_term1) || 0;

      const weightageSum2 = Number(formik.values.weightage_term2) || 0;
      const subEnrichActSum2 = Number(formik.values.sub_enrich_act_term2) || 0;
      const portfolioSum2 = Number(formik.values.portfoilo_term2) || 0;
      const hlyExamSum2 = Number(formik.values.annual_exam) || 0;

      const totalTerm1 =
        weightageSum1 + subEnrichActSum1 + portfolioSum1 + hlyExamSum1;
      const totalTerm2 =
        weightageSum2 + subEnrichActSum2 + portfolioSum2 + hlyExamSum2;

      return { totalTerm1, totalTerm2 };
    };

    const calculateMaxSum = (
      pt1,
      multiple_assessment1,
      pt2,
      multiple_assessment2,
      pt3,
      multiple_assessment3
    ) => {
      const parseAndSum = (a, b) => Number(a) + Number(b);

      const sum1 = parseAndSum(pt1, multiple_assessment1);
      const sum2 = parseAndSum(pt2, multiple_assessment2);
      const sum3 = parseAndSum(pt3, multiple_assessment3);

      const maxSum = Math.max(sum1, sum2);
      const maxSum1 = Math.max(maxSum, sum3);

      if (sum1 > 0 && sum2 > 0 && sum3 > 0) {
        return maxSum + maxSum1;
      }

      return 0; // Or any default value you want to set
    };

    const maxTwoTerm1Value = calculateMaxSum(
      formik.values.pen_paper_term1_pt1,
      formik.values.multiple_assessment_term1_pt1,
      formik.values.pen_paper_term1_pt2,
      formik.values.multiple_assessment_term1_pt2,
      formik.values.pen_paper_term1_pt3,
      formik.values.multiple_assessment_term1_pt3
    );
    const maxTwoTerm2Value = calculateMaxSum(
      formik.values.pen_paper_term2_pt1,
      formik.values.multiple_assessment_term2_pt1,
      formik.values.pen_paper_term2_pt2,
      formik.values.multiple_assessment_term2_pt2,
      formik.values.pen_paper_term2_pt3,
      formik.values.multiple_assessment_term2_pt3
    );

    formik.setFieldValue("best_of_two_term1", maxTwoTerm1Value);
    formik.setFieldValue("best_of_two_term2", maxTwoTerm2Value);

    const { totalTerm1, totalTerm2 } = calculateTotal();

    formik.setFieldValue("total_marks_term_1", totalTerm1.toFixed(2));
    formik.setFieldValue("total_marks_term_2", totalTerm2.toFixed(2));
    const calculateGrade = (totalMarks) => {
      if (totalMarks >= 91 && totalMarks <= 100) {
        return "A1";
      } else if (totalMarks >= 81 && totalMarks <= 90) {
        return "A2";
      } else if (totalMarks >= 71 && totalMarks <= 80) {
        return "B1";
      } else if (totalMarks >= 61 && totalMarks <= 70) {
        return "B2";
      } else if (totalMarks >= 51 && totalMarks <= 60) {
        return "C1";
      } else if (totalMarks >= 41 && totalMarks <= 50) {
        return "C2";
      } else if (totalMarks >= 33 && totalMarks <= 40) {
        return "D";
      } else {
        return "E";
      }
    };
    // Calculate and set final grades
    const gradeTerm1 = calculateGrade(totalTerm1);
    const gradeTerm2 = calculateGrade(totalTerm2);

    formik.setFieldValue("final_grade_term_1", gradeTerm1);
    formik.setFieldValue("final_grade_term_2", gradeTerm2);
  }, [formik.values, formik.setFieldValue, selectedVal]);

  return (
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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
      <form className="py-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
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
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="student_name"
              >
                Student Name
              </label>
              <input
                type="text"
                id="student_name"
                value={formik.values.student_name}
                onChange={formik.handleChange}
                disabled
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.student_name && formik.errors.student_name
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            {formik.touched.student_name && formik.errors.student_name && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.student_name}
              </p>
            )}
          </div>
        </div>

        <hr className="mt-6 border-b-1 border-blueGray-300" />
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          TERM:1
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="total_marks_term_1"
              >
                TOTAL MARKS
              </label>
              <input
                id="total_marks_term_1"
                type="number"
                disabled
                value={formik.values.total_marks_term_1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.total_marks_term_1 &&
                  formik.errors.total_marks_term_1
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="final_grade_term_1"
              >
                Grade
              </label>
              <input
                id="final_grade_term_1"
                type="text"
                disabled
                value={formik.values.final_grade_term_1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.final_grade_term_1 &&
                  formik.errors.final_grade_term_1
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
        <hr className="my-6 border-b-1 border-blueGray-300" />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-2">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase text-center">
              PT:1{" "}
              <span className="text-[10px] text-slate-600 normal-case">
                max(5)
              </span>
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="pen_paper_term1_pt1"
                  >
                    Pen & Paper
                  </label>
                  <input
                    id="pen_paper_term1_pt1"
                    type="number"
                    value={
                      formik.values.pen_paper_term1_pt1 >= 5
                        ? 5
                        : formik.values.pen_paper_term1_pt1
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.pen_paper_term1_pt1 &&
                      formik.errors.pen_paper_term1_pt1
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.pen_paper_term1_pt1 &&
                  formik.errors.pen_paper_term1_pt1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.pen_paper_term1_pt1}
                    </p>
                  )}
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="multiple_assessment_term1_pt1"
                  >
                    Multiple Assesment
                  </label>
                  <input
                    id="multiple_assessment_term1_pt1"
                    type="number"
                    value={
                      formik.values.multiple_assessment_term1_pt1 >= 5
                        ? 5
                        : formik.values.multiple_assessment_term1_pt1
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.multiple_assessment_term1_pt1 &&
                      formik.errors.multiple_assessment_term1_pt1
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.multiple_assessment_term1_pt1 &&
                  formik.errors.multiple_assessment_term1_pt1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.multiple_assessment_term1_pt1}
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-2">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase text-center">
              PT:2
              <span className="text-[10px] text-slate-600 normal-case">
                max(5)
              </span>
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="pen_paper_term1_pt2"
                  >
                    Pen & Paper
                  </label>
                  <input
                    id="pen_paper_term1_pt2"
                    type="number"
                    value={
                      formik.values.pen_paper_term1_pt2 >= 5
                        ? 5
                        : formik.values.pen_paper_term1_pt2
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.pen_paper_term1_pt2 &&
                      formik.errors.pen_paper_term1_pt2
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.pen_paper_term1_pt2 &&
                  formik.errors.pen_paper_term1_pt2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.pen_paper_term1_pt2}
                    </p>
                  )}
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="multiple_assessment_term1_pt2"
                  >
                    Multiple Assesment
                  </label>
                  <input
                    id="multiple_assessment_term1_pt2"
                    type="number"
                    value={
                      formik.values.multiple_assessment_term1_pt2 >= 5
                        ? 5
                        : formik.values.multiple_assessment_term1_pt2
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.multiple_assessment_term1_pt2 &&
                      formik.errors.multiple_assessment_term1_pt2
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.multiple_assessment_term1_pt2 &&
                  formik.errors.multiple_assessment_term1_pt2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.multiple_assessment_term1_pt2}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-2">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase text-center">
              PT:3{" "}
              <span className="text-[10px] text-slate-600 normal-case">
                max(5)
              </span>
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="pen_paper_term1_pt3"
                  >
                    Pen & Paper
                  </label>
                  <input
                    id="pen_paper_term1_pt3"
                    type="number"
                    value={
                      formik.values.pen_paper_term1_pt3 >= 5
                        ? 5
                        : formik.values.pen_paper_term1_pt3
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.pen_paper_term1_pt3 &&
                      formik.errors.pen_paper_term1_pt3
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.pen_paper_term1_pt3 &&
                  formik.errors.pen_paper_term1_pt3 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.pen_paper_term1_pt3}
                    </p>
                  )}
              </div>
              <div className="w-full lg:w-6/12 px-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="multiple_assessment_term1_pt3"
                  >
                    Multiple Assesment
                  </label>
                  <input
                    id="multiple_assessment_term1_pt3"
                    type="number"
                    value={
                      formik.values.multiple_assessment_term1_pt3 >= 5
                        ? 5
                        : formik.values.multiple_assessment_term1_pt3
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.multiple_assessment_term1_pt3 &&
                      formik.errors.multiple_assessment_term1_pt3
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.multiple_assessment_term1_pt3 &&
                  formik.errors.multiple_assessment_term1_pt3 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.multiple_assessment_term1_pt3}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap py-3 px-2">
          <div className="w-full lg:w-6/12 px-2">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="best_of_two_term1"
              >
                Best of two
              </label>
              <input
                id="best_of_two_term1"
                type="number"
                value={formik.values.best_of_two_term1}
                disabled
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.best_of_two_term1 &&
                  formik.errors.best_of_two_term1
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-2">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="weightage_term1"
              >
                weightage
              </label>
              <input
                id="weightage_term1"
                type="text"
                value={formik.values.weightage_term1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.weightage_term1 &&
                  formik.errors.weightage_term1
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap py-3 ">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="portfoilo_term1"
              >
                portfolio
              </label>
              <input
                id="portfoilo_term1"
                type="number"
                value={
                  formik.values.portfoilo_term1 >= 5
                    ? 5
                    : formik.values.portfoilo_term1
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.portfoilo_term1 &&
                  formik.errors.portfoilo_term1
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="sub_enrich_act_term1"
              >
                Sub Enrich Act
              </label>
              <input
                id="sub_enrich_act_term1"
                type="number"
                value={
                  formik.values.sub_enrich_act_term1 >= 5
                    ? 5
                    : formik.values.sub_enrich_act_term1
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.sub_enrich_act_term1 &&
                  formik.errors.sub_enrich_act_term1
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="hly_exam_term1"
              >
                Half Yearly exam
              </label>
              <input
                id="hly_exam_term1"
                type="number"
                value={formik.values.hly_exam_term1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.hly_exam_term1 && formik.errors.hly_exam_term1
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
        <hr className="mt-6 border-b-1 border-blueGray-300 pb-6" />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          TERM:1 Scholastic
        </h6>

        <div className="flex flex-wrap pb-10">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t1_scholastic_computer"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                computer
              </label>
              <select
                id="t1_scholastic_computer"
                value={formik.values.t1_scholastic_computer}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t1_scholastic_drawing"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                drawing
              </label>
              <select
                id="t1_scholastic_drawing"
                value={formik.values.t1_scholastic_drawing}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t1_scholastic_deciplin"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                deciplin
              </label>
              <select
                id="t1_scholastic_deciplin"
                value={formik.values.t1_scholastic_deciplin}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t1_scholastic_gk"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                gk
              </label>
              <select
                id="t1_scholastic_gk"
                value={formik.values.t1_scholastic_gk}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t1_scholastic_remark"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                remark
              </label>
              <select
                id="t1_scholastic_remark"
                value={formik.values.t1_scholastic_remark}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t1_scholastic_entery"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                entery
              </label>
              <select
                id="t1_scholastic_entery"
                value={formik.values.t1_scholastic_entery}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="mt-6 border-b-1 border-blueGray-300 pb-6" />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          TERM:2
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="total_marks_term_2"
              >
                TOTAL MARKS
              </label>
              <input
                id="total_marks_term_2"
                type="number"
                disabled
                value={formik.values.total_marks_term_2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.total_marks_term_2 &&
                  formik.errors.total_marks_term_2
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="final_grade_term_2"
              >
                Grade
              </label>
              <input
                id="final_grade_term_2"
                type="text"
                disabled
                value={formik.values.final_grade_term_2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.final_grade_term_2 &&
                  formik.errors.final_grade_term_2
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
        <hr className="my-6 border-b-1 border-blueGray-300" />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold text-center uppercase">
              PT:1{" "}
              <span className="text-[10px] text-slate-600 normal-case">
                max(5)
              </span>
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="pen_paper_term2_pt1"
                  >
                    Pen & Paper
                  </label>
                  <input
                    id="pen_paper_term2_pt1"
                    type="number"
                    value={
                      formik.values.pen_paper_term2_pt1 >= 5
                        ? 5
                        : formik.values.pen_paper_term2_pt1
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.pen_paper_term2_pt1 &&
                      formik.errors.pen_paper_term2_pt1
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.pen_paper_term2_pt1 &&
                  formik.errors.pen_paper_term2_pt1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.pen_paper_term2_pt1}
                    </p>
                  )}
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="multiple_assessment_term2_pt1"
                  >
                    Multiple Assesment
                  </label>
                  <input
                    id="multiple_assessment_term2_pt1"
                    type="number"
                    value={
                      formik.values.multiple_assessment_term2_pt1 >= 5
                        ? 5
                        : formik.values.multiple_assessment_term2_pt1
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.multiple_assessment_term2_pt1 &&
                      formik.errors.multiple_assessment_term2_pt1
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.multiple_assessment_term2_pt1 &&
                  formik.errors.multiple_assessment_term2_pt1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.multiple_assessment_term2_pt1}
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase text-center">
              PT:2
              <span className="text-[10px] text-slate-600 normal-case">
                max(5)
              </span>
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="pen_paper_term2_pt2"
                  >
                    Pen & Paper
                  </label>
                  <input
                    id="pen_paper_term2_pt2"
                    type="number"
                    value={
                      formik.values.pen_paper_term2_pt2 >= 5
                        ? 5
                        : formik.values.pen_paper_term2_pt2
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.pen_paper_term2_pt2 &&
                      formik.errors.pen_paper_term2_pt2
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.pen_paper_term2_pt2 &&
                  formik.errors.pen_paper_term2_pt2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.pen_paper_term1_pt2}
                    </p>
                  )}
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="multiple_assessment_term2_pt2"
                  >
                    Multiple Assesment
                  </label>
                  <input
                    id="multiple_assessment_term2_pt2"
                    type="number"
                    value={
                      formik.values.multiple_assessment_term2_pt2 >= 5
                        ? 5
                        : formik.values.multiple_assessment_term2_pt2
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.multiple_assessment_term2_pt2 &&
                      formik.errors.multiple_assessment_term2_pt2
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.multiple_assessment_term2_pt2 &&
                  formik.errors.multiple_assessment_term2_pt2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.multiple_assessment_term2_pt2}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase text-center">
              PT:3{" "}
              <span className="text-[10px] text-slate-600 normal-case">
                max(5)
              </span>
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="pen_paper_term2_pt3"
                  >
                    Pen & Paper
                  </label>
                  <input
                    id="pen_paper_term2_pt3"
                    type="number"
                    value={
                      formik.values.pen_paper_term2_pt3 >= 5
                        ? 5
                        : formik.values.pen_paper_term2_pt3
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.pen_paper_term2_pt3 &&
                      formik.errors.pen_paper_term2_pt3
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.pen_paper_term2_pt3 &&
                  formik.errors.pen_paper_term2_pt3 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.pen_paper_term2_pt3}
                    </p>
                  )}
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="multiple_assessment_term2_pt3"
                  >
                    Multiple Assesment
                  </label>
                  <input
                    id="multiple_assessment_term2_pt3"
                    type="number"
                    value={
                      formik.values.multiple_assessment_term2_pt3 >= 5
                        ? 5
                        : formik.values.multiple_assessment_term2_pt3
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                      formik.touched.multiple_assessment_term2_pt3 &&
                      formik.errors.multiple_assessment_term2_pt3
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.multiple_assessment_term2_pt3 &&
                  formik.errors.multiple_assessment_term2_pt3 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.multiple_assessment_term2_pt3}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap py-3 px-4">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="best_of_two_term2"
              >
                Best of two
              </label>
              <input
                id="best_of_two_term2"
                type="text"
                value={formik.values.best_of_two_term2}
                disabled
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.best_of_two_term2 &&
                  formik.errors.best_of_two_term2
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="weightage_term2"
              >
                weightage
              </label>
              <input
                id="weightage_term2"
                type="text"
                value={formik.values.weightage_term2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.weightage_term2 &&
                  formik.errors.weightage_term2
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap py-3 px-4">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="portfoilo_term2"
              >
                portfolio
              </label>
              <input
                id="portfoilo_term2"
                type="number"
                value={
                  formik.values.portfoilo_term2 >= 5
                    ? 5
                    : formik.values.portfoilo_term2
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.portfoilo_term2 &&
                  formik.errors.portfoilo_term2
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="sub_enrich_act_term2"
              >
                Sub Enrich Act
              </label>
              <input
                id="sub_enrich_act_term2"
                type="number"
                value={
                  formik.values.sub_enrich_act_term2 >= 5
                    ? 5
                    : formik.values.sub_enrich_act_term2
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.sub_enrich_act_term2 &&
                  formik.errors.sub_enrich_act_term2
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="annual_exam"
              >
                Half Yearly exam
              </label>
              <input
                id="annual_exam"
                type="number"
                value={formik.values.annual_exam}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                  formik.touched.annual_exam && formik.errors.annual_exam
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
        <hr className="my-6 border-b-1 border-blueGray-300 py-6" />
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          TERM:2 Scoolastic
        </h6>

        <div className="flex flex-wrap pb-10">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t2_scholastic_workeducation"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                workeducation
              </label>
              <select
                id="t2_scholastic_workeducation"
                value={formik.values.t2_scholastic_workeducation}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t2_scholastic_art"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                art
              </label>
              <select
                id="t2_scholastic_art"
                value={formik.values.t2_scholastic_art}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t2_scholastic_health"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                health
              </label>
              <select
                id="t2_scholastic_health"
                value={formik.values.t2_scholastic_health}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap pb-10">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t2_scholastic_deciplin"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                deciplin
              </label>
              <select
                id="t2_scholastic_deciplin"
                value={formik.values.t2_scholastic_deciplin}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t2_scholastic_remark"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                remark
              </label>
              <select
                id="t2_scholastic_remark"
                value={formik.values.t2_scholastic_remark}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label
                htmlFor="t2_scholastic_entery"
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              >
                entery
              </label>
              <select
                id="t2_scholastic_entery"
                value={formik.values.t2_scholastic_entery}
                onChange={formik.handleChange}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option selected>choose a Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        </div>

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
  );
};

export default PrimaryForm;
