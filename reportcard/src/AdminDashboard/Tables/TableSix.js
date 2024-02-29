import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const TableSix = () => {
  const students = useSelector((state) => state.student.students);

  const getMiscellaneousCounts = () => {
    if (!Array.isArray(students)) {
      return [];
    }

    const miscellaneousCounts = students.reduce((acc, student) => {
      const gender = student.gender || 'Other';
      const differently_abled = student.differently_abled || '';
      const teacher_ward = student.teacher_ward || '';

      if (!acc[gender]) {
        acc[gender] = { differently_abled: 0, teacher_ward: 0 };
      }

      acc[gender].differently_abled += differently_abled === 'yes' ? 1 : 0;
      acc[gender].teacher_ward += teacher_ward === 'yes' ? 1 : 0;

      return acc;
    }, {});

    return miscellaneousCounts;
  };

  useEffect(() => {}, [students]);

  const renderTable = () => {
    const miscellaneousCounts = getMiscellaneousCounts();

    return (
      <table className="w-full text-sm text-center dark:text-gray-900 border border-gray-900 dark:border-gray-700 bg-gradient-to-br from-green-400 via-blue-500 to-indigo-600 p-2 rounded-lg">
      <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-900">
         <tr>
            <th scope="col" className="py-3 px-6">
              Gender
            </th>
            <th scope="col" className="py-3 px-6">
              Differently Abled
            </th>
            <th scope="col" className="py-3 px-6">
              Teacher Ward
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(miscellaneousCounts).map(([gender, counts], index) => (
            <tr
              key={index}
              className="bg-white border-b border-gray-900 border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="py-4 px-6">{gender}</td>
              <td className="py-4 px-6">{counts.differently_abled}</td>
              <td className="py-4 px-6">{counts.teacher_ward}</td>
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

export default TableSix;
