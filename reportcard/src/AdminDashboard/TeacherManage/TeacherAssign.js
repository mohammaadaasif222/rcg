import React, { useState, useEffect } from "react";
import TeacherClassesModal from "./TeacherClassesModal.js";
import { fetchTeachers, fetchClasses } from "../../redux/actions.js";
import { useSelector, useDispatch } from "react-redux";
import TeacherProfile from "./TeacherProfile.js";
import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/24/outline";
import { URL } from "../../URL";
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

// Import all images from the teachers folder dynamically
const images = importAll(
  require.context("../../static/teachers", false, /\.(png|jpe?g|svg)$/)
);

export default function Teacher() {
  const [jsonData, setJsonData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedTeacherName, setSelectedTeacherName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [teacherProfile, setTeacherProfile] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { Allteachers, loading: teachersLoading } = useSelector(
    (state) => state.Allteachers
  );
  const { Allclasses, loading: classesLoading } = useSelector(
    (state) => state.Allclasses
  );
  const loggedinUser = useSelector((state) => state.auth.user.user);

  useEffect(() => {
    dispatch(fetchTeachers());
    setTeacherData(Allteachers);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchClasses());
    setJsonData(Allclasses);
  }, [dispatch]);
  useEffect(() => {
    if (!teachersLoading) {
      setTeacherData(Allteachers);
    }
  }, [Allteachers, teachersLoading]);

  useEffect(() => {
    if (!classesLoading) {
      setJsonData(Allclasses);
      setLoading(false); // Set loading to false once classes are loaded
    }
  }, [Allclasses, classesLoading]);
  const handleTeacherClick = async (teacherId, teachername) => {
    setSelectedTeacher(teacherId);
    setSelectedTeacherName(teachername);
    setSelectedClass("");
    setSelectedSubjects([]);
  };

  const handleClassClick = (className) => {
    setSelectedClass(className);
    setSelectedSubjects([]);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.includes(subject)
        ? prevSubjects.filter((prevSubject) => prevSubject !== subject)
        : [...prevSubjects, subject]
    );
  };

  const midpoint = Math.ceil(teacherData.length / 2);

  const closeClassModal = () => {
    setSelectedTeacher("");
  };

  const editteacher = (teacher) => {
    setTeacherProfile(teacher);
  };
  const closeTeacherModal = () => {
    setTeacherProfile("");
  };

  const handleTeacherDelete = async (userIdToDelete) => {
    try {
      const response = await fetch(`${URL}/staff/delete/${userIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setError("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setMessage(data.message);
      dispatch(fetchTeachers());
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <>
      {message && (
        <div
          class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div class="flex">
            <div class="py-1">
              <svg
                class="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p class="font-bold">Success</p>
              <p class="text-sm">{message}</p>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div
          class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div class="flex">
            <div class="py-1">
              <svg
                class="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p class="font-bold">Error</p>
              <p class="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
      <ul className="lg:flex lg:flex-wrap lg:gap-7">
        {teacherData
          .filter((item) => item.email !== 'parth@gmail.com')
          .map((teacher) => (
            <li
              key={teacher.email}
              className="flex justify-between flex-col sm:flex-row py-5 w-full xl:w-[48%] px-3 bg-white shadow-xl rounded-lg my-3"
            >
              <div className="flex justify-between gap-3 items-center">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50 shadow-md"
                  src={
                    images[teacher.imagename] ||
                    require(`../../static/teachers/default_user.png`)
                  }
                  alt=""
                />
                <div className="">
                  <p
                    onClick={() => editteacher(teacher)}
                    className="text-sm font-semibold uppercase leading-6 text-blue-500 cursor-pointer underline-0"
                  >
                    {teacher.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {teacher.email}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {teacher.address.split(" ")[2]}
                  </p>
                </div>
              </div>

              <div className="flex items-center flex-col gap-x-5">
                <p className="text-sm leading-6 text-gray-900">
                  I/c of {teacher.incharge}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <span>{teacher.phone}</span>
                </p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">
                    {teacher.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Cog6ToothIcon
                  onClick={() =>
                    handleTeacherClick(teacher.teacher_id, teacher.name)
                  }
                  className="text-gray-700 w-6 h-6 cursor-pointer "
                />
              
                <TrashIcon
                  onClick={() => handleTeacherDelete(teacher.teacher_id)}
                  className="text-red-700 w-6 h-6 cursor-pointer"
                />
              </div>
            </li>
          ))}
      </ul>

      {teacherProfile && (
        <TeacherProfile
          teacherProfile={teacherProfile}
          closeTeacherModal={closeTeacherModal}
        />
      )}

      {selectedTeacher && (
        <TeacherClassesModal
          Allclasses={Allclasses}
          selectedTeacher={selectedTeacher}
          data={jsonData}
          setJsonData={setJsonData}
          onClose={closeClassModal}
          teacherData={teacherData}
          selectedTeacherName={selectedTeacherName}
        />
      )}
    </>
  );
}
