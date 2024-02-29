import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ChartOne() {
  const students = useSelector((state) => state.student.students);

  const getgenderCounts = () => {
    if (!Array.isArray(students)) {
      return { Male: 0, Female: 0 };
    }

    const genderCounts = students.reduce(
      (acc, student) => {
        if (student.gender === 'Male') {
          acc.Male += 1;
        } else if (student.gender === 'Female') {
          acc.Female += 1;
        }
        return acc;
      },
      { Male: 0, Female: 0 }
    );

    return genderCounts;
  };

  useEffect(() => {
    // Include any additional logic if needed
  }, [students]);

  const renderTable = () => {
    const genderCounts = getgenderCounts();

    return (
      <table className="w-full text-sm text-center dark:text-gray-900 border border-gray-900 dark:border-gray-700 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-2 rounded-lg">
        <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-900">
          <tr>
            <th scope="col" className="py-3 px-6 text-center font-semibold">Gender</th>
            <th scope="col" className="py-3 px-6 text-center font-semibold">Count</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b border-gray-900 border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="py-4 text-center font-medium text-gray-800">Male</td>
            <td className="py-4 px-6 text-center font-medium text-gray-800">{genderCounts.Male}</td>
          </tr>
          <tr className="bg-white border-b border-gray-900 border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="py-4 px-6 text-center font-medium text-gray-800">Female</td>
            <td className="py-4 px-6 text-center font-medium text-gray-800">{genderCounts.Female}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="table-container p-4">
      {renderTable()}
    </div>
  );
}
