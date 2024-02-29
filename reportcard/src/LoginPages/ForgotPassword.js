import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions";

import HomePageMenu from "../Feature/HomePageMenu";
import { Link } from "react-router-dom";
import { BasicFooter } from "../Feature/BasicFooter";
import loginpageimg from "../static/loginpageimg.jpg";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {URL} from '../URL'

const ForgotPassword = () => {

  const [userError, setUserError] = useState("");
  const [message, setMessage] = useState("");

  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${URL}/admin/forgot-password`,
          values
        );
        if (response.status === 200) {
          setMessage(response.data.message);
        } else {
          setUserError("User not found");
        }
      } catch (error) {
        setUserError("User not found");
      }
    },
  });

  return (
    <>
      <HomePageMenu />
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-20 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                  Forgot Password
                </h2>
              </div>
              {message && message ? (
                <div className="bg-green-100 text-green-900 p-3 rounded-md my-5 text-center ">
                  {message}
                </div>
              ) : (
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>

                    {userError && <p style={{ color: "red" }}>{userError}</p>}
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                  <p className="mt-10 text-center text-sm text-gray-500 ">
                    Not a member?{" "}
                    <Link
                      to="/admindashboard"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Send req to get access as a admin
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[35rem] max-w-none rounded-3xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[30rem]"
              src={loginpageimg}
              alt=""
            />
          </div>
        </div>
      </div>
      <BasicFooter />
    </>
  );
};
const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userData) => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
