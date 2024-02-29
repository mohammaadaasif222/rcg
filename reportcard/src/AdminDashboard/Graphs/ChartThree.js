import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

const ChartThree = () => {
  const students = useSelector((state) => state.student.students);
  const getgenderCounts = () => {
    if (!Array.isArray(students)) {
      return [];
    }

    const genderCounts = students.reduce((acc, student) => {
      const religion = student.religion || 'Other';
      const gender = student.gender || 'Other';

      if (!acc[religion]) {
        acc[religion] = { Male :0, Female: 0 };
      }

      acc[religion][gender]++;
      return acc;
    }, {});

    return genderCounts;
  };

  const createChartThree = () => {
    const ctx = document.getElementById('chartthree')?.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    if (window.myChartThree) {
      window.myChartThree.destroy();
    }

    const genderCounts = getgenderCounts();

    const labels = ['Male', 'Female'];
    const datasets = Object.keys(genderCounts).map((religion, index) => ({
      label: religion,
      data: [genderCounts[religion]?.Male || 0, genderCounts[religion]?.Female || 0],
      backgroundColor: index === 0 ? '#343cdc' : index === 1 ? '#3490dc' : '#ff9900', // Adjust colors accordingly
      borderColor: index === 0 ? '#343cdc' : index === 1 ? '#3490dc' : '#ff9900',
      borderWidth: 1,
    }));

    window.myChartThree = new Chart(ctx, {
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
              text: 'gender',
            },
          },
        },
      },
    });
  };


  useEffect(() => {
    createChartThree();
  }, [students]);

  return (
    <canvas className='bg-white w-full rounded-lg text-gray-100 rounded-md py-2 px-3 leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' id="chartthree" width="150" height="150"></canvas>

  );
};

export default ChartThree;
