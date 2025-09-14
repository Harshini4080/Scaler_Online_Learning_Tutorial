import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LectureView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  // Fetch lecture data
  const fetchLecture = async () => {
    try {
      const res = await api.get(`/lectures/${id}`);
      const lec = res.data;
      setLecture(lec);

      const questions = lec.questions || lec.quiz || [];
      if (questions.length > 0) {
        setAnswers(new Array(questions.length).fill(null));
      }

      if (lec.completed) setCompleted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLecture();
  }, [id]);

  // Mark lecture as completed
  const completeReading = async () => {
    try {
      await api.post(`/lectures/${id}/complete`);
      setCompleted(true);
      alert("Lecture marked as completed ");

      // Navigate back to course details and trigger refresh
      navigate(-1, { state: { refresh: true } });
    } catch (err) {
      alert("Error completing lecture");
    }
  };

  // Submit quiz
  const submitQuiz = async () => {
    try {
      const res = await api.post(`/lectures/${id}/submit`, { answers });
      setResult(res.data);
    } catch (err) {
      alert("Error submitting quiz");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600 animate-pulse">
        Loading lecture...
      </div>
    );
  }

  if (!lecture) {
    return (
      <p className="text-center text-red-500 font-semibold">
       Lecture not found.
      </p>
    );
  }

  const questions = lecture.questions || lecture.quiz || [];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b p-4 flex justify-between items-center shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 truncate">
          {lecture.title}
        </h2>
        <button
          onClick={() => navigate(-1, { state: { refresh: true } })}
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          ← Back
        </button>
      </div>

      {/* Lecture Content */}
      <div className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">{lecture.title}</h1>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
          {lecture.content}
        </p>

        {!completed ? (
          <button
            onClick={completeReading}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Mark as Completed
          </button>
        ) : (
          <span className="text-green-700 font-semibold">Completed</span>
        )}
      </div>

      {/* Quiz Section */}
      {questions.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            Quiz
          </h3>
          <p className="text-sm text-gray-500 mb-4">Test your understanding</p>

          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div
                key={q._id || idx}
                className="p-4 border rounded-lg bg-gray-50 hover:shadow transition"
              >
                <p className="font-medium text-gray-800 mb-2">
                  {idx + 1}. {q.text}
                </p>
                <div className="space-y-2">
                  {(q.options || []).map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-center space-x-2 cursor-pointer p-2 rounded transition ${
                        answers[idx] === i
                          ? "bg-blue-50 border border-blue-300"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${idx}`}
                        checked={answers[idx] === i}
                        onChange={() => {
                          const newAns = [...answers];
                          newAns[idx] = i;
                          setAnswers(newAns);
                        }}
                        className="accent-blue-600"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={submitQuiz}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Submit Quiz
          </button>

          {result && (
            <div
              className={`mt-6 p-4 rounded-lg font-semibold text-center ${
                result.passed
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              Score: {result.score}% – {result.passed ? " Passed" : "Try Again"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
