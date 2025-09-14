import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CourseDetails from "./pages/CourseDetails";
import LectureView from "./pages/LectureView";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/lecture/:id" element={<LectureView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
