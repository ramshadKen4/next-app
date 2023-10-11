import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StudentListPage from './pages/student/StudentListPage.js';
import TeacherListPage from './pages/teacher/TeacherListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginPage/>} /> */}
        <Route path="/students" element={<StudentListPage/>} />
        <Route path="/teachers" element={<TeacherListPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
