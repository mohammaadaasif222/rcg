import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {URL} from '../URL'

export default function CreateTeacher() {
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
    branch: "",
    about: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    imagename: Yup.string(),
    role: Yup.string().required("Role is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    branch: Yup.string().required("Branch is required"),
    about: Yup.string(),
  });

  const [imageFile, setImageFile] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("file", imageFile);
        formData.append("role", values.role);
        formData.append("phone", values.phone);
        formData.append("address", values.address);
        formData.append("branch", values.branch);
        formData.append("about", values.about);

        const response = await axios.post(
         ` ${URL}/admin/staff`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
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

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full mx-auto">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Create staff member
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
              <form className="py-3" onSubmit={formik.handleSubmit}>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-3/12 px-4">
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
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.password && formik.errors.password
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-4">
                    <div className="flex justify-center items-center flex-col w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="imagename"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        id="imagename"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="imagename"
                        className="border-2 border-dashed border-gray-500 cursor-pointer py-2 px-4 w-full text-center rounded-lg hover:bg-white"
                      >
                        {imageFile
                          ? imageFile.name.slice(0, 23)
                          : "Choose an image"}
                      </label>
                    </div>
                    {formik.touched.imagename && formik.errors.imagename && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.imagename}
                      </p>
                    )}
                  </div>
                </div>
                <hr className="mt-6 border-b-1 pb-6 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.address && formik.errors.address
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="phone"
                      >
                        phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.address && formik.errors.address
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="branch"
                      >
                        branch
                      </label>
                      <input
                        type="text"
                        id="branch"
                        value={formik.values.branch}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          formik.touched.address && formik.errors.address
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>
                </div>
                <hr className="mt-6 border-b-1 pb-6 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Designation
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="role"
                      >
                        select Role
                      </label>
                      <select
                        name="role"
                        id="role"
                        onChange={formik.handleChange}
                        value={formik.values.role}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                        <option value="accountant">Accountant</option>
                        <option value="librarian">Librarian</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  About
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="about"
                      >
                        Remarks
                      </label>
                      <textarea
                        value={formik.values.about}
                        onChange={formik.handleChange}
                        type="text"
                        id="about"
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
