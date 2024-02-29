import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

const ChartFour = () => {
  const students = useSelector((state) => state.student.students);

  const getgenderCounts = () => {
    if (!Array.isArray(students)) {
      return [];
    }

    const genderCounts = students.reduce((acc, student) => {
      const admin_category = student.admin_category || 'Other';
      const gender = student.gender || 'Other';

      if (!acc[admin_category]) {
        acc[admin_category] = { Male: 0, Female: 0 };
      }

      acc[admin_category][gender]++;
      return acc;
    }, {});

    return genderCounts;
  };

  const createChartFour = () => {
    const ctx = document.getElementById('chartfour')?.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    if (window.myChartFour) {
      window.myChartFour.destroy();
    }

    const genderCounts = getgenderCounts();

    const labels = ['Male', 'Female'];
    const categories = Object.keys(genderCounts);
    const datasets = categories.map((admin_category, index) => ({
      label: `Category ${admin_category}`,
      data: [genderCounts[admin_category]?.Male || 0, genderCounts[admin_category]?.Female || 0],
      backgroundColor: index === 0 ? '#343cdc' : index === 1 ? '#3490dc' : index === 2 ? '#ff9900' : '#55cc55', // Adjust colors accordingly
      borderColor: index === 0 ? '#343cdc' : index === 1 ? '#3490dc' : index === 2 ? '#ff9900' : '#55cc55',
      borderWidth: 1,
    }));

    window.myChartFour = new Chart(ctx, {
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
    createChartFour();
  }, [students]);

  return (
    <canvas className='bg-white w-full rounded-lg text-gray-100 rounded-md py-2 px-3 leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' id="chartfour" width="150" height="150"></canvas>
  );
};

export default ChartFour;
