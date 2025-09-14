import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import api from "../api/axios";

export default function CourseDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [lectures, setLectures] = useState([]);
  const [course, setCourse] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);

  // Fetch course and lectures
  const fetchLecturesAndCourse = async () => {
    try {
      const courseRes = await api.get(`/courses/${id}`);
      setCourse(courseRes.data.course);

      const lecRes = await api.get(`/courses/${id}/lectures`);
      const combined = lecRes.data.map((lec) => ({
        ...lec,
        questions: lec.questions || lec.quiz || [],
      }));

      setLectures(combined);
    } catch (err) {
      console.error("Error fetching lectures/course:", err);
    }
  };

  // Fetch progress
  const fetchProgress = async () => {
    try {
      const res = await api.get(`/progress/${id}`);
      setCompletedLectures(res.data.completedLectures || []);
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchLecturesAndCourse();
    fetchProgress();
  }, [id]);

  // Refresh progress if coming back from lecture
  useEffect(() => {
    if (location.state?.refresh) {
      fetchProgress();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const completedCount = completedLectures.length;
  const totalLectures = lectures.length;
  const progressPercent = totalLectures
    ? Math.round((completedCount / totalLectures) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {course && (
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-gray-900">{course.title}</h2>
          <p className="text-gray-600 leading-relaxed">{course.description}</p>
        </div>
      )}

      {/* Progress Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {completedCount}/{totalLectures} lectures
          </span>
          <span className="text-sm text-gray-500">{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Lectures List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Lectures</h3>
        <ul className="space-y-3">
          {lectures.map((lec, idx) => {
            const isCompleted = completedLectures.includes(lec._id);
            const isLocked = idx > completedCount; // unlock next lecture only

            return (
              <li
                key={lec._id}
                className={`p-4 border rounded-xl shadow-sm flex justify-between items-center transition hover:shadow-md ${
                  isLocked ? "bg-gray-100 opacity-60" : "bg-white"
                }`}
              >
                <div>
                  <span className="font-medium text-gray-800">
                    {idx + 1}. {lec.title} {isCompleted && "✅"}
                  </span>
                </div>
                {!isLocked ? (
                  <Link
                    to={`/lecture/${lec._id}`}
                    state={{ refresh: true }} // flag for refresh
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                  >
                    Open →
                  </Link>
                ) : (
                  <span className="text-sm text-gray-400 flex items-center">
                    🔒 Locked
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
