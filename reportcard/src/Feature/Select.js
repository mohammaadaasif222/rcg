import React, { useEffect, useState } from "react";
import { fetchClasses, setSelectedValues } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const Select = ({ sectioncheck }) => {
  const dispatch = useDispatch();

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSection, setSelectedSection] = useState("a");
  const [selectedNumber, setSelectedNumber] = useState("a");
  const [subjects, setSubjects] = useState([]);

  const [data, setData] = useState([{ class_name: "" }]);
  const [loading, setLoading] = useState(true);

  const { Allclasses, loading: classesLoading } = useSelector(
    (state) => state.Allclasses
  );
  const Admindata = useSelector((state) => state.auth.user.user);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    if (!classesLoading) {
      setLoading(false);
      let filterKeysWithValueOne;
      const fetchData = async (Allclasses) => {
        setData(Allclasses);
        try {
          if (Allclasses && Allclasses.length > 0) {
            if (Admindata.role === "admin") {
              filterKeysWithValueOne = (item) => ({
                classvalue: item.classvalue,
                class_name: item.class_name,
                section: item.section,
                subjects: Object.keys(item).filter(
                  (key) =>
                    key !== "class_name" &&
                    key !== "classvalue" &&
                    key !== "class_id" &&
                    key !== "section" &&
                    item[key] !== "no"
                ),
              });
            } else if (Admindata.role === "teacher") {
              filterKeysWithValueOne = (item) => ({
                classvalue: item.classvalue,
                class_name: item.class_name,
                section: item.section,
                subjects: Object.keys(item).filter(
                  (key) =>
                    key !== "class_name" &&
                    key !== "class_id" &&
                    item[key] == Admindata.teacher_id
                ),
              });
            }

            const filteredData = Allclasses.map(filterKeysWithValueOne).filter(
              (item) => item.subjects.length > 0
            );

            // Set initial values for selectedClass and selectedSubject
            if (filteredData.length > 0) {
              setSelectedClass(filteredData[0].classvalue);
              // setSelectedSubject(filteredData[0].subjects[0]);
            }

            setData(filteredData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData(Allclasses);
    }
  }, [Allclasses, classesLoading, Admindata]);
  useEffect(() => {
    if (selectedClass) {
      const selectedClassData = data.find(
        (item) =>
          String(item.classvalue).toLowerCase() ===
            selectedClass.toLowerCase() &&
          String(item.section).toLowerCase() === selectedSection.toLowerCase()
      );
      setSubjects(selectedClassData ? selectedClassData.subjects : []);
    } else {
      setSubjects([]);
    }
  }, [data, selectedClass, selectedSection]);

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  useEffect(() => {
    const key = getKeyByValue(classObject, selectedClass);
    const newSelectedValues = [
      selectedClass,
      selectedSection,
      selectedSubject,
      Number(key),
    ];
    dispatch(setSelectedValues(newSelectedValues));
  }, [selectedClass, selectedSection, selectedSubject, dispatch]);
  
  const uniqueClasses = Array.from(new Set(data.map((cls) => cls.class_name)));

  const classObject = data
    .filter((cls) => uniqueClasses.includes(cls.class_name))
    .reduce((acc, cls) => {
      acc[cls.class_name] = cls.classvalue;
      return acc;
    }, {});

  return (
    <div className="container mx-auto justify-right bg-white p-3 mt-2 mb-6 shadow-xl rounded-lg hidden md:block">
      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="classSelect" className="block">
            Select Class:
          </label>
          <select
            id="classSelect"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border rounded"
            style={{ width: "150px" }} // Set the desired width
          >
            <option value="">Select Class</option>
            {Object.entries(classObject).map(([className, classValue]) => (
              <option key={className} value={classValue}>
                {className === '13' ? 'Nursery' : className}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sectionSelect" className="block">
            Select Section:
          </label>
          <select
            id="sectionSelect"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2 border rounded"
            style={{ width: "100px" }} // Set the desired width
          >
            {/* <option value="">Select Section</option> */}
            {["A", "B", "C", "D"].map((section) => (
              <option key={section} value={section.toLowerCase()}>
                {section}
              </option>
            ))}
          </select>
        </div>
        {sectioncheck && selectedClass && selectedClass !== 'nursery' && selectedClass !== 'ukg' && selectedClass !== 'lkg' && (
          <div>
            <label htmlFor="subjectSelect" className="block">
              Select Subject:
            </label>
            <select
              id="subjectSelect"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border rounded"
              style={{ width: "200px" }} // Set the desired width
            >
              <option value="">Select Subject</option>
              {Array.isArray(subjects) &&
                subjects.map((subject, index) => (
                  <option key={`${selectedClass}-${index}`} value={subject}>
                    {subject}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
