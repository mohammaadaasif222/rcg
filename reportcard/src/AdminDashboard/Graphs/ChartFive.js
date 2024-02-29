import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

const ChartFive = () => {
  const students = useSelector((state) => state.student.students);
  const getMiscellaneousCounts = () => {
    if (!Array.isArray(students)) {
      return [];
    }

    const miscellaneousCounts = students.reduce((acc, student) => {
      const gender = student.gender || 'Other';
      const sgc = student.sgc || '';
      const bpl = student.bpl || '';

      if (!acc[gender]) {
        acc[gender] = { sgc: 0, bpl: 0 };
      }

      acc[gender].sgc += sgc === 'sgc' ? 1 : 0;
      acc[gender].bpl += bpl === 'bpl' || bpl === 'EWS' ? 1 : 0;

      return acc;
    }, {});

    return miscellaneousCounts;
  };

  const createChartFive = () => {
    const ctx = document.getElementById('Chartfive')?.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    if (window.myChartFive) {
      window.myChartFive.destroy();
    }

    const miscellaneousCounts = getMiscellaneousCounts();

    const labels = ['sgc', 'bpl'];
    const categories = Object.keys(miscellaneousCounts);
  
    const colors = ['#343cdc', '#3490dc', '#FF6384', '#FF9F40', '#36A2EB', '#4BC0C0', '#9966FF', '#FFCE56'];
  
    const datasetColors = colors.slice(0, categories.length);
  
    const datasets = categories.map((gender, index) => ({
      label: gender,
      data: [
        miscellaneousCounts[gender]?.sgc || 0,
        miscellaneousCounts[gender]?.bpl || 0,
      ],
      backgroundColor: datasetColors[index],
      borderColor: datasetColors[index],
      borderWidth: 1,
    }));
  
    window.myChartFive = new Chart(ctx, {
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
    createChartFive();
  }, [students]);

  return (
    <canvas
      className='bg-white w-full rounded-lg text-gray-100 rounded-md py-2 px-3 leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
      id="Chartfive"
      width="150" height="150"
    ></canvas>
  );
};

export default ChartFive;
