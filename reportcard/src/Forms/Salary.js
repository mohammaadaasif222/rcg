import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {URL} from '../URL'

export default function Salary() {
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [teachers, setTeachers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const initialValues = {
    name: "",
    employee_id: "",
    position: "",
    contact: "",
    bank_details: "",
    pay_month: "",
    salary: "",
    allowance: 3,
    absents: "",
    deductions: "",
    bonus: "",
    net_salary: "",
    payment_date: new Date(),
  };

  const validationSchema = Yup.object().shape({
    salary: Yup.number().required("salary is required"),
    employee_id: Yup.string().required("Employee ID is required"),
    position: Yup.string().required("Position is required"),
    contact: Yup.string().required("Contact is required"),
    bank_details: Yup.string().required("Bank details are required"),
    pay_month: Yup.string().required("Pay month is required"),
    allowance: Yup.number(),
    absents: Yup.number().required("Leave is required"),
    deductions: Yup.number().required("Deductions are required"),
    bonus: Yup.number(),
    net_salary: Yup.number().required("Net salary is required"),
    payment_date: Yup.string().required("Payment date is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${URL}/staff/salary`,
          values
        );
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
          resetForm();
        }, 5000);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Error submitting form:", error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    },
  });

  const fetchStaff = async () => {
    try {
      const response = await fetch(`${URL}/staff/teachers`);
      if (!response.ok) {
      }
      if (response.ok) {
      }
      const staffData = await response.json();
      setTeachers(staffData);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      throw new Error("An error occurred while fetching staff data");
    }
  };
  const handleStaff = (teacherdata) => {
    formik.setFieldValue("employee_id", teacherdata.teacher_id);
    formik.setFieldValue("name", teacherdata.name);
    formik.setFieldValue("position", teacherdata.role);
    formik.setFieldValue("contact", teacherdata.phone);
    setFiltered([]);
  };

  useEffect(() => {
    if (teachers.length === 0) {
      fetchStaff();
    }
    if (formik.values.name || (formik.values.employee_id && teachers)) {
      const newFiltered = teachers.filter((item) =>
        item.name.includes(formik.values.name.toString())
      );
      setFiltered(newFiltered);
    } else {
      setFiltered([]);
    }
    if (formik.values.salary && formik.values.absents && formik.values.bonus) {
      const perDay = Number(formik.values.salary) / 30;
      const deduct = perDay * Number(formik.values.absents);
      const netSalary = Number(formik.values.salary) - deduct
      formik.setFieldValue("deductions", deduct.toFixed(2));
      formik.setFieldValue("net_salary", Number(formik.values.bonus) + Number(netSalary.toFixed(2)) );

    }
  }, [formik.values]);
  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full mx-auto">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Pay Salary
              </h6>
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
              <form className="py-6" onSubmit={formik.handleSubmit}>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.name && formik.errors.name
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
                            onClick={() => handleStaff(item)}
                          >
                            <span className="text-xs rounded-full bg-green-100 px-3 py-2 font-semibold text-green-900 ">
                              ID. {item.teacher_id}
                            </span>
                            <span className="uppercase text-xs rounded-full bg-green-100 px-3 py-2 font-semibold  text-green-900">
                              {" "}
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="employee_id"
                      >
                        Employee ID
                      </label>
                      <input
                        id="employee_id"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.employee_id}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.employee_id &&
                          formik.errors.employee_id
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.employee_id &&
                      formik.errors.employee_id && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.employee_id}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="salary"
                      >
                        salary
                      </label>
                      <input
                        type="number"
                        id="salary"
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.salary && formik.errors.salary
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.salary && formik.errors.salary && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.salary}
                      </p>
                    )}
                  </div>
                </div>
                <hr className="mt-6 border-b-1 pb-6 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Other Information
                </h6>
                <div className="flex flex-wrap pb-5">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        htmlFor="position"
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      >
                        position
                      </label>
                      <select
                        id="position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option selected>choose one</option>
                        <option value="teacher">Teacher</option>
                        <option value="accountant">Accountant</option>
                        <option value="driver">Driver</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        htmlFor="pay_month"
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      >
                        pay month
                      </label>
                      <select
                        id="pay_month"
                        value={formik.values.pay_month}
                        onChange={formik.handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option selected>choose one</option>
                        <option value="jan">Jan</option>
                        <option value="feb">Feb</option>
                        <option value="mar">Mar</option>
                        <option value="apr">Apr</option>
                        <option value="may">May</option>
                        <option value="jun">Jun</option>
                        <option value="jul">Jul</option>
                        <option value="aug">Aug</option>
                        <option value="sep">Sep</option>
                        <option value="oct">Oct</option>
                        <option value="nov">Nov</option>
                        <option value="dec">Dec</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="contact"
                      >
                        contact number
                      </label>
                      <input
                        type="tel"
                        id="contact"
                        value={formik.values.contact}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.contact && formik.errors.contact
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.contact && formik.errors.contact && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.contact}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="absents"
                      >
                        absents
                      </label>
                      <input
                        type="number"
                        id="absents"
                        value={formik.values.absents}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.absents && formik.errors.absents
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.absents && formik.errors.absents && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.absents}
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="bonus"
                      >
                        bonus
                      </label>
                      <input
                        type="number"
                        id="bonus"
                        value={formik.values.bonus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.bonus && formik.errors.bonus
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.bonus && formik.errors.bonus && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.bonus}
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="deductions"
                      >
                        deductions
                      </label>
                      <input
                        type="number"
                        id="deductions"
                        disabled
                        value={formik.values.deductions}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.deductions && formik.errors.deductions
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.deductions && formik.errors.deductions && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.deductions}
                      </p>
                    )}
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300 pb-6" />
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="net_salary"
                      >
                        Net Salary
                      </label>
                      <input
                        type="number"
                        id="net_salary"
                        disabled
                        value={formik.values.net_salary}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.net_salary && formik.errors.net_salary
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.net_salary && formik.errors.net_salary && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.net_salary}
                      </p>
                    )}
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300 pb-6" />

                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="bank_details"
                      >
                        Bank Details
                      </label>
                      <textarea
                        value={formik.values.bank_details}
                        onChange={formik.handleChange}
                        type="text"
                        id="bank_details"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        rows="4"
                      ></textarea>
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
          )}
        </div>
      </div>
    </section>
  );
}
