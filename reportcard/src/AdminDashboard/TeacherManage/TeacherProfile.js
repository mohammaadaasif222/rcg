import React, { useState } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { updateUserFailure } from "../../redux/actions";
import { URL } from "../../URL";
const TeacherProfile = ({ teacherProfile, closeTeacherModal }) => {
  const token = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Name: teacherProfile?.name || "",
    Role: teacherProfile?.role || "",
    Email: teacherProfile?.email || "",
    Password: teacherProfile?.password || "",
    Address: teacherProfile?.address || "",
    BranchAddress: teacherProfile?.branch || "",
    Contact: teacherProfile?.phone || "",
    Incharge: teacherProfile?.incharge || "not available",
    About: teacherProfile?.about || "",
  });
  const [editMode, setEditMode] = useState({
    Name: false,
    Role: false,
    Email: false,
    Password: false,
    Address: false,
    SchoolName: false,
    BranchAddress: false,
    Contact: false,
    Incharge: false,
    About: false,
  });

  const handleEditClick = (field) =>
    setEditMode({ ...editMode, [field]: true });

  const handleSaveClick = async (field) => {
    setEditMode({ ...editMode, [field]: false });

    try {
      const response = await fetch(`${URL}/staff/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: teacherProfile.teacher_id,
          updatedFields: { [field]: formData[field] },
        }),
      });

      const result = await response.json();
    } catch (error) {
      console.error("Error during update:", error);
      dispatch(updateUserFailure("An unexpected error occurred."));
    }
  };

  const handleChange = (e, field) =>
    setFormData({ ...formData, [field]: e.target.value });

  const renderEditableField = (field, label) => (
    <div className="mb-2 text-blueGray-600">
      {editMode[field] ? (
        <>
          <input
            type="text"
            value={formData[field]}
            onChange={(e) => handleChange(e, field)}
            className="border-b border-gray-500 focus:outline-none"
          />
          <span
            onClick={() => handleSaveClick(field)}
            className="cursor-pointer text-green-500 hover:text-green-700 ml-2"
          >
            <CheckIcon className="w-4 h-4 inline" />
          </span>
        </>
      ) : (
        <>
          <span>{formData[field]}</span>
          <span
            onClick={() => handleEditClick(field)}
            className="cursor-pointer text-blue-500 hover:text-blue-700 ml-2"
          >
            <PencilIcon className="w-4 h-4 inline" />
          </span>
        </>
      )}
    </div>
  );

  const renderEditableField2 = (field, label) => (
    <ul role="list" className="divide-y divide-gray-100 ">
      <li className="mx-auto w-1/3 flex justify-between px-2 gap-x-6 py-5 mt-2 border-b-4 border-gray-700 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
        <div className="flex min-w-0 gap-x-2">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-2 text-gray-800">
              {label}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col  sm:items-end">
          <p className="text-md leading-2 text-gray-800">
            {editMode[field] ? (
              <>
                <input
                  type="text"
                  value={formData[field]}
                  onChange={(e) => handleChange(e, field)}
                  className="border-b border-gray-500 focus:outline-none"
                />
                <span
                  onClick={() => handleSaveClick(field)}
                  className="cursor-pointer text-green-500 hover:text-green-700 ml-1"
                >
                  <CheckIcon className="w-4 h-4 inline" />
                </span>
              </>
            ) : (
              <>
                <span>{formData[field]}</span>
                <span
                  onClick={() => handleEditClick(field)}
                  className="cursor-pointer text-blue-500 hover:text-blue-700 ml-1"
                >
                  <PencilIcon className="w-4 h-4 inline" />
                </span>
              </>
            )}
          </p>
        </div>
      </li>
    </ul>
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header capitalize">
          <h2>Edit {teacherProfile.name} profile</h2>
          <button onClick={closeTeacherModal}>Close</button>
        </div>
        <div className="modal-body flex flex-col lg:flex-row capitalize"></div>
        <main className="profile-page">
          <section className="  bg-blueGray-200">
            <div className="container mx-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-2  -mt-0">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={
                            teacherProfile.imagename
                              ? require(`../../static/teachers/${teacherProfile.imagename}`)
                              :require(`../../static/teachers/default_user.png`)
                          }
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <a
                        href={`https://wa.me/+91${teacherProfile.phone}`}
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex py-4 lg:pt-4 pt-8">
                        <div className="flex p-3 w-full">
                          <span className="text-md font-bold uppercase border-b-4 border-gray-700 text-blueGray-600">
                            <span className="text-sm text-blueGray-400">
                              Role : {teacherProfile.role}
                            </span>{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <div className="mb-2 text-blueGray-600">
                      {/* <i className={`fas fa-${field} mr-2 text-lg text-blueGray-400`}></i> */}
                      {editMode["Name"] ? (
                        <>
                          <input
                            type="text"
                            value={formData.Name}
                            onChange={(e) => handleChange(e, "Name")}
                            className="border-b border-gray-500 focus:outline-none"
                          />
                          <span
                            onClick={() => handleSaveClick("Name")}
                            className="cursor-pointer text-green-500 hover:text-green-700 ml-2"
                          >
                            <CheckIcon className="w-4 h-4 inline" />
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-5xl font-bold block uppercase">
                            {formData["Name"]}
                            <span
                              onClick={() => handleEditClick("Name")}
                              className="cursor-pointer text-blue-500 hover:text-blue-700 ml-2"
                            >
                              <PencilIcon className="w-4 h-4 inline" />
                            </span>
                          </span>
                        </>
                      )}
                    </div>

                    {renderEditableField2("Address", "Address")}
                    {renderEditableField2("BranchAddress", "Branch Address")}
                    {renderEditableField2("Email", "Email")}
                    {renderEditableField2("Contact", "Contact")}
                    {renderEditableField2("Incharge", "Incharge")}
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          {renderEditableField("About")}
                        </p>
                        {/* Add your data editing forms here using the formData state */}
                        {/* <a href="#pablo" className="font-normal text-pink-500">
                          Show more
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="relative bg-blueGray-200 pt-2 pb-2 mt-4">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                      Made for{" "}
                      <a
                        href="https://www.gurunanak.com"
                        className="text-blueGray-500 hover:text-gray-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Gurunanak
                      </a>{" "}
                      by{" "}
                      <a
                        href="https://www.skyway-tech.com"
                        className="text-blueGray-500 hover:text-blueGray-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Skyway tech
                      </a>
                      .
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TeacherProfile;
