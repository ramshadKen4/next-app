import React from 'react';

const DataTable = ({ data, search, columns, handleSelect, handleEdit }) => (
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
          <tr key={student.id} onClick={() => handleSelect(student)}>
            <td>{student.id}</td>
            <td>{student.name}</td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default DataTable;
