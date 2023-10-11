import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<h1>"LoginPage"</h1>} />
        <Route path="/students" element={<h1>"StudentListPage"</h1>} />
        <Route path="/teachers" element={<h1>"TeacherListPage"</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
