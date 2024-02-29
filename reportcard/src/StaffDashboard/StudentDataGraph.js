import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { URL } from "../URL";
const GraphComponent = () => {
  const [term1ChartData, setTerm1ChartData] = useState(null);
  const [chartInstances, setChartInstances] = useState([]);
  const [csv, setCsv] = useState();

  // const dispatch = useDispatch();
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
      chartInstances.forEach((instance) => instance.destroy());
      const newChartInstances = term1ChartData.map((data, index) => {
        const canvas = document.getElementById(`term1Chart-${index}`);
        if (canvas) {
          const ctx = canvas.getContext("2d");
          return new Chart(ctx, {
            type: "bar",
            data: data,
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
        return null;
      });
      setChartInstances(newChartInstances);
    }
  }, [term1ChartData]);

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
                  Understand Your data Using Graph
                </p>
              </div>
              <button className="bg-blue-500 text-white px-2 py-1">
                <Link to="/StudentDataTable"> Table Format</Link>
              </button>
            </div>

            <div className="chart-container ">
              {term1ChartData &&
                term1ChartData.map((data, index) => (
                  <div key={index} className="chart-item">
                    <div className="card">
                      <h2>{data.datasets[0].label.split(" - ")[1]}</h2>
                      <canvas
                        id={`term1Chart-${index}`}
                        width="400"
                        height="400"
                      ></canvas>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphComponent;
