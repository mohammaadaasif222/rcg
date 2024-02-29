import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

export default function ChartOne(){
  const students = useSelector((state) => state.student.students);
  const getgenderCounts = () => {
    if (!Array.isArray(students)) {
      return { Male: 0, Female: 0 };
    }

    const genderCounts = students.reduce((acc, student) => {
        const maleCount = students.filter((student) => student.gender === 'Male').length;
        const femaleCount = students.filter((student) => student.gender === 'Female').length;
    
        return [maleCount, femaleCount]
    }, {});

    return genderCounts;
  };

  const createChartOne = () => {
    const ctx = document.getElementById('chartone')?.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    if (window.myChartOne) {
      window.myChartOne.destroy();
    }

    const genderCounts = getgenderCounts();

    window.myChartOne = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Boys', 'Gilrs'],
        datasets: [{
          label: 'Graph between boys and girls',
          data: Object.values(genderCounts),
          backgroundColor: ['#dc8034', '#343cdc'],
          borderColor: ['#3490dc', '#9561e2'],
          borderWidth: 1,
        }],
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
    createChartOne();
  }, [students]);

  return (
    <canvas className='bg-white w-full rounded-lg text-gray-100 rounded-md py-2 px-3 leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' id="chartone" width="300" height="200"></canvas>
  );
};
