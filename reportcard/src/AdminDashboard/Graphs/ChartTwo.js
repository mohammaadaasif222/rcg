import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

const ChartTwo = () => {
  const students = useSelector((state) => state.student.students);

  const getgenderCounts = () => {
    if (!Array.isArray(students)) {
      return [];
    }

    const genderCounts = students.reduce((acc, student) => {
      const reservation_category = student.reservation_category || 'Other';
      const gender = student.gender || 'Other';

      if (!acc[reservation_category]) {
        acc[reservation_category] = { Male: 0, Female: 0 };
      }

      acc[reservation_category][gender]++;
      return acc;
    }, {});

    return genderCounts;
  };

  const createChartTwo = () => {
    const ctx = document.getElementById('charttwo')?.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    if (window.myChartTwo) {
      window.myChartTwo.destroy();
    }

    const genderCounts = getgenderCounts();

    const labels = ['Male', 'Female'];
    const categories = Object.keys(genderCounts);
    const datasets = categories.map((reservation_category, index) => ({
      label: reservation_category,
      data: [genderCounts[reservation_category]?.Male || 0, genderCounts[reservation_category]?.Female || 0],
      backgroundColor: index === 0 ? '#343cdc' : index === 1 ? '#3490dc' : index === 2 ? '#ff9900' : '#55cc55', // Adjust colors accordingly
      borderColor: index === 0 ? '#343cdc' : index === 1 ? '#3490dc' : index === 2 ? '#ff9900' : '#55cc55',
      borderWidth: 1,
    }));

    window.myChartTwo = new Chart(ctx, {
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
    createChartTwo();
  }, [students])

  return (
    <canvas className='bg-white w-full rounded-lg text-gray-100 rounded-md py-2 px-3 leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' id="charttwo" width="150" height="150"></canvas>
  );
  
};

export default ChartTwo;
