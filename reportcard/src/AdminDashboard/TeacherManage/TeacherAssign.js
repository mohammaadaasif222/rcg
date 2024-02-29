import React, { useState, useEffect } from "react";
import TeacherClassesModal from "./TeacherClassesModal.js";
import { fetchTeachers, fetchClasses } from "../../redux/actions.js";
import { useSelector, useDispatch } from "react-redux";
import TeacherProfile from "./TeacherProfile.js";
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

// Import all images from the teachers folder dynamically
const images = importAll(require.context('../../static/teachers', false, /\.(png|jpe?g|svg)$/));

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
  

  const dispatch = useDispatch();
  const { Allteachers, loading: teachersLoading } = useSelector(state => state.Allteachers);
  const { Allclasses , loading: classesLoading} = useSelector(state => state.Allclasses);

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

  const editteacher=(teacher)=>{
    setTeacherProfile(teacher)
  }
  const closeTeacherModal = () => {
    setTeacherProfile("");
  };

  return (
    <>


          <div className="flex flex-col md:flex-row p-2">
            <div className="mb-4 md:mb-0 md:w-1/2 pr-2">
              <div className="p-3 bg-white w-full shadow-xl rounded-lg">
                <ul role="list" className="divide-y divide-gray-100">
                  {teacherData.slice(0, midpoint).map((teacher) => (
                    <li
                      key={teacher.email}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          src={images[teacher.imagename] || require(`../../static/teachers/default_user.png`)}
                          alt=""
                        />
                        
                        <div className="min-w-0 flex-auto">
                          <p onClick={()=>editteacher(teacher)} className="text-sm font-semibold leading-6 text-gray-900">
                            {teacher.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {teacher.email}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {teacher.address}
                          </p>
                        </div>
                      </div>

                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end flex">
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
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end flex">
                        <button
                          onClick={() =>
                            handleTeacherClick(teacher.teacher_id, teacher.name)
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Assign class
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full md:w-1/2 pl-2">
              <div className="p-3 bg-white w-full shadow-xl rounded-lg">
                <ul role="list" className="divide-y divide-gray-100">
                  {teacherData.slice(midpoint).map((teacher) => (
                    <li
                      key={teacher.email}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          src={images[teacher.imagename] || require(`../../static/teachers/default_user.png`)}
                          alt=""
                        />
                        <div className="min-w-0 flex-auto">
                          <p  onClick={()=>editteacher(teacher)} className="text-sm font-semibold leading-6 text-gray-900">
                            {teacher.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {teacher.email}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {teacher.address}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          I/c of {teacher.incharge}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {teacher.phone}
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
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end flex">
                        <button
                          onClick={() =>
                            handleTeacherClick(teacher.teacher_id, teacher.name)
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Assign class
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        {/* </div>
      </div> */}
    {teacherProfile &&( <TeacherProfile teacherProfile={teacherProfile} closeTeacherModal={closeTeacherModal}/>)}

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




