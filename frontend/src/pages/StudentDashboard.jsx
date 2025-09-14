import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Student Dashboard</h2>
      <p className="text-gray-600 text-center">Browse and enroll in available courses</p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <Link
              to={`/course/${course._id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
