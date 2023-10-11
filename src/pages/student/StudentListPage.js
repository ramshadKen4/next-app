import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import DataTable from '../../components/DataTable';
import ActionButton from '../../components/ActionButton';
import AddStudentForm from '../../components/AddDetails';
import './StudentListPage.css'

const StudentListPage = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Student 1' },
    { id: 2, name: 'Student 2' },
    // Add more sample students as needed
  ]);

  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [newStudentName, setNewStudentName] = useState('');

  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
    setSelectedStudent(null);
  };

  const handleEditStudent = (student) => {
    setIsEditing(true);
    setSelectedStudent(student);
    setEditedName(student.name);
  };
  

  const handleSaveStudent = () => {
    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id ? { ...student, name: editedName } : student
    );
    setStudents(updatedStudents);
    setIsEditing(false);
    setSelectedStudent(null);
    setEditedName(''); // Clear the edited name
  };
  

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName('');
  };

  const handleAddStudent = (name) => {
    if (name) {
      const newStudent = {
        id: generateUniqueId(),
        name,
      };
      setStudents([...students, newStudent]);
      setNewStudentName('');
    }
  };

  const generateUniqueId = () => {
    let maxId = 0;
    students.forEach((student) => {
      if (student.id > maxId) {
        maxId = student.id;
      }
    });
    return maxId + 1;
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setIsEditing(false); // Reset editing mode when selecting a different student
    setEditedName('');
  };

  return (
    <div className="student-list">
      <h1>Student List</h1>
      <SearchBar value={search} onChange={setSearch} />
      <DataTable data={students} columns={['ID', 'Name']} search={search} handleSelect={handleSelectStudent} handleEdit={handleEditStudent} />
      {selectedStudent && (
        <div className="action-buttons">
          {isEditing ? (
            <div>
              <ActionButton label="Save Student" onClick={handleSaveStudent} />
              <ActionButton label="Cancel" onClick={handleCancelEdit} />
            </div>
          ) : (
            <ActionButton label="Edit Student" onClick={handleEditStudent} />
          )}
          <ActionButton label="Delete Student" onClick={() => handleDeleteStudent(selectedStudent.id)} />
        </div>
      )}
      <AddStudentForm onSubmit={handleAddStudent} buttonText="Add Student" />
    </div>
  );
};

export default StudentListPage;
