import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import StudentListPage from './pages/student/StudentListPage.js';
import TeacherListPage from './pages/teacher/TeacherListPage';
import Login from './pages/login/Login';
import { useRef, useState } from 'react';
function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const intendedDestination = useRef(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/students"
          element={<StudentListPage/>}
        />
        <Route
          path="/teachers" element={<TeacherListPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
  function handleLogin(isAuthenticated) {
    if (isAuthenticated) {
      setAuthenticated(true);
      if (intendedDestination.current) {
        Navigate(intendedDestination.current);
      }
    }
  }
}

export default App;
