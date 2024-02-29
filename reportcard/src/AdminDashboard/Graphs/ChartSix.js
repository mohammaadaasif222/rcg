import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

const ChartSix = () => {
  const students = useSelector((state) => state.student.students);
  const getMiscellaneousCounts = () => {
    if (!Array.isArray(students)) {
      return [];
    }

    const miscellaneousCounts = students.reduce((acc, student) => {
      const gender = student.gender || 'Other';
      const diffrently_abled = student.diffrently_abled || '';
      const teachersWard = student.teacher_ward || '';

      if (!acc[gender]) {
        acc[gender] = { diffrently_abled: 0, teacher_ward: 0 };
      }

      acc[gender].diffrently_abled += diffrently_abled === 'yes' ? 1 : 0;
      acc[gender].teacher_ward += teachersWard === 'yes' ? 1 : 0;

      return acc;
    }, {});

    return miscellaneousCounts;
  };

  const createChartSix = () => {
    const ctx = document.getElementById('ChartSix')?.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    if (window.myChartSix) {
      window.myChartSix.destroy();
    }

    const miscellaneousCounts = getMiscellaneousCounts();

    const labels = ['diffrently_abled', 'teacher_ward'];
    const categories = Object.keys(miscellaneousCounts);
  
    const colors = ['#36A2EB', '#4BC0C0', '#9966FF', '#FFCE56'];
  
    const datasetColors = colors.slice(0, categories.length);
  
    const datasets = categories.map((gender, index) => ({
      label: gender,
      data: [
        miscellaneousCounts[gender]?.diffrently_abled || 0,
        miscellaneousCounts[gender]?.teacher_ward || 0,
      ],
      backgroundColor: datasetColors[index],
      borderColor: datasetColors[index],
      borderWidth: 1,
    }));
  
    window.myChartSix = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Students',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Miscellaneous Categories',
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    createChartSix();
  }, [students]);

  return (
    <canvas
      className='bg-white w-full rounded-lg text-gray-100 rounded-md py-2 px-3 leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
      id="ChartSix"
      width="150" height="150"
    ></canvas>
  );
};

export default ChartSix;
