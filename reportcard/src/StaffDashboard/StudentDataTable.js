import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Papa from "papaparse";
import {URL} from '../URL'
const StudentDataTable = () => {
  const [term1ChartData, setTerm1ChartData] = useState(null);
  const [chartInstances, setChartInstances] = useState([]);
  const [csv, setCsv] = useState();
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const selectedVal = useSelector(
    (state) => state.selectedValues.selectedValues
  );
  const selectedClass = selectedVal[0];
  const selectedSection = selectedVal[1];
  const selectedClassNumber = selectedVal[3];

  function generateTerm1ChartsData(dataFromApi) {
    const subjects = Object.keys(dataFromApi[0])
      .filter(
        (key) =>
          (key.startsWith("t1_") || key.startsWith("t2_")) &&
          ![
            "t1_total",
            "t1_percentage",
            "t2_total",
            "t2_percentage",
            "t1_scholastic_computer",
            "t1_scholastic_drawing",
            "t1_scholastic_gk",
            "t1_scholastic_deciplin",
            "t1_scholastic_remark",
            "t1_scholastic_entery",
            "t2_scholastic_workeducation",
            "t2_scholastic_art",
            "t2_scholastic_health",
            "t2_scholastic_deciplin",
            "t2_scholastic_remark",
            "t2_scholastic_entery",
          ].includes(key)
      )
      .map((key) => key.slice(3));

    const gradeCategories = {
      A1: { min: 91, max: 100 },
      A2: { min: 81, max: 90 },
      B1: { min: 71, max: 80 },
      B2: { min: 61, max: 70 },
      C1: { min: 51, max: 60 },
      C2: { min: 41, max: 50 },
      D: { min: 33, max: 40 },
      E: { min: 0, max: 32 },
    };

    const term1ChartsData = subjects.map((subject) => {
      const genderCategories = ["Male", "Female"];

      const datasets = genderCategories.map((gender) => {
        const data = Object.keys(gradeCategories).map((grade) => {
          const filteredData = dataFromApi.filter(
            (student) =>
              student.gender === gender &&
              (student[`t1_${subject}`] ?? 0) >= gradeCategories[grade].min &&
              (student[`t1_${subject}`] ?? 0) <= gradeCategories[grade].max
          );
          return filteredData.length;
        });

        return {
          label: `${gender} - ${subject}`,
          data: data,
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          borderWidth: 1,
        };
      });

      return {
        labels: Object.keys(gradeCategories),
        datasets: datasets,
      };
    });

    return term1ChartsData;
  }

  function generateChartsDataForSecondry(dataFromApi) {
    const subjects = Object.keys(dataFromApi[0])
    .filter(
      (key) =>
        (key.startsWith("t1_")) &&
        ![
          "t1_total_marks",
          "t1_scholastic_computer",
          "t1_scholastic_drawing",
          "t1_scholastic_gk",
          "t1_scholastic_deciplin",
          "t1_scholastic_remark",
          "t1_scholastic_entery",
        ].includes(key)
    )
    .map((key) => key.slice(3));

  const gradeCategories = {
    A1: { min: 91, max: 100 },
    A2: { min: 81, max: 90 },
    B1: { min: 71, max: 80 },
    B2: { min: 61, max: 70 },
    C1: { min: 51, max: 60 },
    C2: { min: 41, max: 50 },
    D: { min: 33, max: 40 },
    E: { min: 0, max: 32 },
  };

  const term1ChartsData = subjects.map((subject) => {
    const genderCategories = ["Male", "Female"];

    const datasets = genderCategories.map((gender) => {
      const data = Object.keys(gradeCategories).map((grade) => {
        const filteredData = dataFromApi.filter(
          (student) =>
            student.gender === gender &&
            (student[`t1_${subject}`] ?? 0) >= gradeCategories[grade].min &&
            (student[`t1_${subject}`] ?? 0) <= gradeCategories[grade].max
        );
        return filteredData.length;
      });

      return {
        label: `${gender} - ${subject}`,
        data: data,
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      };
    });

    return {
      labels: Object.keys(gradeCategories),
      datasets: datasets,
    };
  });

  return term1ChartsData;
}



  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.post(
          `${URL}/student/marks/graph/${selectedClass}/${selectedSection}`
        );
        const dataFromApi = response.data;
        console.log(dataFromApi);
        setCsv(dataFromApi[0]);
        if (selectedClassNumber < 9) {
          const term1ChartData = generateTerm1ChartsData(dataFromApi);
          setTerm1ChartData(term1ChartData);
        } else {    
                const term1ChartData = generateChartsDataForSecondry(dataFromApi);
          setTerm1ChartData(term1ChartData);
        } 
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    if (selectedClass && selectedSection) {
      fetchDataFromApi();
    }
  }, [selectedClass, selectedSection]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  useEffect(() => {
    return () => {
      chartInstances.forEach((instance) => instance.destroy());
    };
  }, []);
  useEffect(() => {
    if (term1ChartData) {
      // Transform chart data into table data
      const newTableData = term1ChartData.map((chartData, index) => {
        const subjectName = chartData.datasets[0].label.split(" - ")[1];
        const tableRows = chartData.labels.map((label, labelIndex) => {
          const rowData = chartData.datasets.map((dataset) => {
            return {
              label: dataset.label,
              value: dataset.data[labelIndex],
            };
          });
          return {
            grade: label,
            data: rowData,
          };
        });
        return {
          subjectName: subjectName,
          rows: tableRows,
        };
      });

      setTableData(newTableData);
    }
  }, [term1ChartData]);

  const downloadCsv = (tableIndex) => {
    const table = tableData[tableIndex];
    const csvData = [
      ["Grade", ...table.rows[0].data.map((data) => data.label)],
      ...table.rows.map((row) => [
        row.grade,
        ...row.data.map((data) => data.value),
      ]),
    ];

    const csvContent = Papa.unparse(csvData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${table.subjectName}_table.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

 
  
  function processSubject(data) {
    const subjectData = {};
    data.rows.forEach((item) => {
      const grade = item.grade;
      subjectData[grade] = {};
      item.data.forEach((row) => {
        const labelParts = row.label.split(" - ");
        const gender = labelParts[0];
        subjectData[grade][gender] = row.value;
      });
    });
    return subjectData;
  }

  // Function to aggregate subject data
  function aggregateSubjects(subjectDataList) {

    const aggregatedData = {};
    subjectDataList.forEach((subjectData) => {
      const subjectName = subjectData.subjectName;
      aggregatedData['Grade'] = subjectData.rows.map((item)=> item.grade)
      aggregatedData[subjectName]=subjectData.rows.map((item)=> item.data.length)
    });
    return aggregatedData;
  }
  const data = aggregateSubjects(tableData);
  const downloadCsv2 = (aggregatedData) => {
    const grades = aggregatedData["Grade"];
    const subjects = Object.keys(aggregatedData).filter(key => key !== "Grade");
    
    // Exclude the last row by slicing the subjects array
    const csvData = [
      ["Subject", ...grades], // First row contains column headers
      ...subjects.map((subject) => [
        subject,
        ...aggregatedData[subject]
      ])
    ];
  
    const csvContent = Papa.unparse(csvData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `aggregated_data.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  

  return (
    <>
      <div className="p-3 bg-white w-full shadow-xl rounded-lg">
        <div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {selectedClass} class Grade data
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Marks Table
                </p>
              </div>
              <button className="bg-blue-500 text-white px-2 py-1">
                <Link to="/staff/graph"> Graph Format</Link>
              </button>
            </div>

            <div className="table-container overflow-x-auto">
              {tableData &&
                tableData.map((table, index) => (
                  <div key={index} className="table-item">
                    <h2>{`Table for  ${table.subjectName}`}</h2>
                    <button onClick={() => downloadCsv2(data)}>
                      Download as CSV
                    </button>
                    <table className="w-full text-center dark:text-gray-900 border border-gray-900 dark:border-gray-700 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-2 rounded-lg">
                      <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-900">
                        <tr>
                          <th className=" text-center text-xs font-semibold">
                            Grade
                          </th>
                          {table.rows[0].data.map((data) => (
                            <th key={data.label}>{data.label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, rowIndex) => (
                          <tr
                            className="bg-white border-gray-900 border-b dark:bg-gray-800 dark:border-gray-700"
                            key={rowIndex}
                          >
                            <td className=" text-center font-medium text-gray-800">
                              {row.grade}
                            </td>
                            {row.data.map((data, dataIndex) => (
                              <td
                                className=" text-center font-medium text-gray-800"
                                key={dataIndex}
                              >
                                {data.value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDataTable;
