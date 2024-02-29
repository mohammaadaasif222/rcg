import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const TableFive = () => {
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
              SGC
            </th>
            <th scope="col" className="py-3 px-6">
              BPL
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
              <td className="py-4 px-6">{counts.sgc}</td>
              <td className="py-4 px-6">{counts.bpl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="table-container p-4">
      {renderTable()}
    </div>
  );
};

export default TableFive;
