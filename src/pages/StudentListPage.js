import React, { useState } from 'react';
import './StudentListPage.css'

const StudentListPage = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Student 1' },
    { id: 2, name: 'Student 2' },
  ]);

  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [newStudentName, setNewStudentName] = useState('');


  const generateUniqueId = () => {
    let maxId = 0;
    students.forEach((student) => {
      if (student.id > maxId) {
        maxId = student.id;
      }
    });
    return maxId + 1;
  };

  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
    setSelectedStudent(null);
  };

  const handleEditStudent = () => {
    setIsEditing(true);
    setEditedName(selectedStudent.name);
  };

  const handleSaveStudent = () => {
    const updatedStudents = students.map((student) => {
      if (student.id === selectedStudent.id) {
        return {
          ...student,
          name: editedName, // Update the student's name
        };
      }
      return student;
    });

    setStudents(updatedStudents);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName('');
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudentName) {
      const newStudent = {
        id: generateUniqueId(),
        name: newStudentName,
      };
      setStudents([...students, newStudent]);
      setNewStudentName('');
    }
  };

  return (
    <div className="student-list">
      <h3>Student List</h3>
      <input
        className="search-input"
        type="text"
        placeholder="Search students"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((student) => student.name.toLowerCase().includes(search.toLowerCase()))
            .map((student) => (
              <tr key={student.id} onClick={() => setSelectedStudent(student)}>
                <td>{student.id}</td>
                <td className={isEditing && selectedStudent.id === student.id ? 'editing' : ''}>
                  {isEditing && selectedStudent.id === student.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    student.name
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div className="action-buttons">
          {isEditing ? (
            <div>
              <button className="action-button" onClick={handleSaveStudent}>Save Student</button>
              <button className="action-button" onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <button className="action-button" onClick={handleEditStudent}>Edit Student</button>
          )}
          <button className="action-button" onClick={() => handleDeleteStudent(selectedStudent.id)}>Delete Student</button>
        </div>
      )}
      <br></br>
      <form className="student-form" onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
        />
        <button className="action-button" type="submit">
          Add Student
        </button>
        {isEditing && (
          <button className="action-button" onClick={handleCancelEdit}>Cancel</button>
        )}
      </form>
    </div>
  );
};

export default StudentListPage;
