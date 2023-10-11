import React from 'react';

const DataTable = ({ data, search, columns, handleSelectStudent, handleEditStudent }) => (
  <table className="student-table">
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data
        .filter((student) => student.name.toLowerCase().includes(search.toLowerCase()))
        .map((student) => (
          <tr key={student.id} onClick={() => handleSelectStudent(student)}>
            <td>{student.id}</td>
            <td>{student.name}</td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default DataTable;
