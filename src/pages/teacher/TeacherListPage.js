import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import DataTable from '../../components/DataTable';
import ActionButton from '../../components/ActionButton';
import AddTeacherForm from '../../components/AddDetails'; // Assuming you have a component for adding teacher details.
import './TeacherListPage.css';

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Teacher 1' },
    { id: 2, name: 'Teacher 2' },
    // Add more sample teachers as needed
  ]);

  const [search, setSearch] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('');

  const handleDeleteTeacher = (teacherId) => {
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== teacherId);
    setTeachers(updatedTeachers);
    setSelectedTeacher(null);
  };

  const handleEditTeacher = (teacher) => {
    setIsEditing(true);
    setSelectedTeacher(teacher);
    setEditedName(teacher.name);
  };

  const handleSaveTeacher = () => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === selectedTeacher.id ? { ...teacher, name: editedName } : teacher
    );
    setTeachers(updatedTeachers);
    setIsEditing(false);
    setSelectedTeacher(null);
    setEditedName('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName('');
  };

  const handleAddTeacher = (name) => {
    if (name) {
      const newTeacher = {
        id: generateUniqueId(),
        name,
      };
      setTeachers([...teachers, newTeacher]);
      setNewTeacherName('');
    }
  };

  const generateUniqueId = () => {
    let maxId = 0;
    teachers.forEach((teacher) => {
      if (teacher.id > maxId) {
        maxId = teacher.id;
      }
    });
    return maxId + 1;
  };

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditing(false);
    setEditedName('');
  };

  return (
    <div className="teacher-list">
      <h1>Teacher List</h1>
      <SearchBar value={search} onChange={setSearch} />
      <DataTable data={teachers} columns={['ID', 'Name']} search={search} handleSelect={handleSelectTeacher} handleEdit={handleEditTeacher} />
      {selectedTeacher && (
        <div className="action-buttons">
          {isEditing ? (
            <div>
              <ActionButton label="Save Teacher" onClick={handleSaveTeacher} />
              <ActionButton label="Cancel" onClick={handleCancelEdit} />
            </div>
          ) : (
            <ActionButton label="Edit Teacher" onClick={handleEditTeacher} />
          )}
          <ActionButton label="Delete Teacher" onClick={() => handleDeleteTeacher(selectedTeacher.id)} />
        </div>
      )}
      <AddTeacherForm onSubmit={handleAddTeacher} buttonText="Add Teacher" />
    </div>
  );
};

export default TeacherListPage;
