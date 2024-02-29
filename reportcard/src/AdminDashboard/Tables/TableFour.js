import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const TableFour = () => {
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

  useEffect(() => {}, [students]);

  const renderTable = () => {
    const genderCounts = getgenderCounts();

    return (
      <table className="w-full text-sm text-center dark:text-gray-900 border border-gray-900 dark:border-gray-700 bg-gradient-to-br from-green-400 via-blue-500 to-indigo-600 p-2 rounded-lg">
      <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-900">
        <tr>
            <th scope="col" className="py-3 px-6">
              Admission Category
            </th>
            <th scope="col" className="py-3 px-6">
              Male
            </th>
            <th scope="col" className="py-3 px-6">
              Female
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(genderCounts).map(([admin_category, counts], index) => (
            <tr
              key={index}
              className="bg-white border-b border-gray-900 border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="py-4 px-6">{admin_category}</td>
              <td className="py-4 px-6">{counts.Male}</td>
              <td className="py-4 px-6">{counts.Female}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="table-container p-4 ">
      {renderTable()}
    </div>
  );
};

export default TableFour;
