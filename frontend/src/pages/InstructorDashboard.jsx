import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiEdit, FiTrash2, FiPlusCircle } from "react-icons/fi";

export default function InstructorDashboard() {
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [newLecture, setNewLecture] = useState({
    title: "",
    content: "",
    questions: [],
    _id: null,
  });
  const [question, setQuestion] = useState({
    text: "",
    options: ["", ""],
    correctOption: 0,
  });

  useEffect(() => {
    const fetchAssignedCourse = async () => {
      try {
        const res = await api.get("/courses/mine");
        setCourse(res.data.course);
        const lecRes = await api.get(
          `/courses/${res.data.course._id}/lectures`
        );
        setLectures(lecRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAssignedCourse();
  }, []);

  // Add or update lecture
  const handleAddLecture = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: newLecture.title,
        content: newLecture.content,
        questions: newLecture.questions,
      };

      if (newLecture._id) {
        // Update lecture
        const res = await api.put(
          `/courses/${course._id}/lectures/${newLecture._id}`,
          payload
        );
        setLectures(
          lectures.map((l) => (l._id === newLecture._id ? res.data : l))
        );
        alert("Lecture updated ✅");
      } else {
        // Add new lecture
        const res = await api.post(
          `/courses/${course._id}/lectures`,
          payload
        );
        setLectures([...lectures, res.data]);
        alert("Lecture added 🎉");
      }

      // Reset form
      setNewLecture({ title: "", content: "", questions: [], _id: null });
      setQuestion({ text: "", options: ["", ""], correctOption: 0 });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving lecture");
    }
  };

  // Delete lecture
  const handleDeleteLecture = async (lectureId) => {
    if (!window.confirm("Delete lecture?")) return;
    try {
      await api.delete(`/courses/${course._id}/lectures/${lectureId}`);
      setLectures(lectures.filter((l) => l._id !== lectureId));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting lecture");
    }
  };

  // Add question to lecture form
  const addQuestion = () => {
    if (!question.text.trim()) return;

    // Remove empty options
    const validOptions = question.options.filter((o) => o.trim() !== "");
    if (validOptions.length < 2) {
      alert("Please provide at least 2 options.");
      return;
    }

    setNewLecture({
      ...newLecture,
      questions: [...newLecture.questions, { ...question, options: validOptions }],
    });

    setQuestion({ text: "", options: ["", ""], correctOption: 0 });
  };

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        {course.title}
      </h2>

      {/* Lecture List */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h4 className="text-xl font-semibold mb-4">Lectures</h4>
        {lectures.length === 0 ? (
          <p className="text-gray-500">No lectures yet.</p>
        ) : (
          <ul className="divide-y">
            {lectures.map((l, i) => (
              <li
                key={l._id}
                className="flex justify-between items-center py-3"
              >
                <span className="font-medium text-gray-800">
                  {i + 1}. {l.title}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      setNewLecture({
                        title: l.title,
                        content: l.content || "",
                        questions: l.questions || [],
                        _id: l._id,
                      })
                    }
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit Lecture"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteLecture(l._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete Lecture"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add/Edit Lecture Form */}
      <form
        className="bg-white p-6 rounded-2xl shadow-md space-y-4"
        onSubmit={handleAddLecture}
      >
        <h4 className="text-xl font-semibold">
          {newLecture._id ? "Edit Lecture" : "Add Lecture"}
        </h4>

        <input
          required
          placeholder="Lecture Title"
          value={newLecture.title}
          onChange={(e) =>
            setNewLecture({ ...newLecture, title: e.target.value })
          }
          className="border p-2 w-full rounded"
        />
        <textarea
          required
          placeholder="Lecture Content"
          value={newLecture.content}
          onChange={(e) =>
            setNewLecture({ ...newLecture, content: e.target.value })
          }
          className="border p-2 w-full rounded h-28"
        />

        {/* Quiz Section */}
        <div className="space-y-3">
          <h5 className="font-semibold text-gray-800">Optional Quiz</h5>
          {newLecture.questions.length > 0 && (
            <ul className="space-y-2">
              {newLecture.questions.map((q, i) => (
                <li
                  key={i}
                  className="p-3 bg-gray-50 border rounded-lg text-sm"
                >
                  <strong>Q{i + 1}:</strong> {q.text}
                </li>
              ))}
            </ul>
          )}

          <input
            placeholder="Question"
            value={question.text}
            onChange={(e) =>
              setQuestion({ ...question, text: e.target.value })
            }
            className="border p-2 w-full rounded"
          />
          {question.options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const o = [...question.options];
                o[i] = e.target.value;
                setQuestion({ ...question, options: o });
              }}
              className="border p-2 w-full rounded"
            />
          ))}

          {/* Dropdown for correct option */}
          <select
            value={question.correctOption}
            onChange={(e) =>
              setQuestion({ ...question, correctOption: parseInt(e.target.value) })
            }
            className="border p-2 rounded w-full"
          >
            {question.options.map((_, i) => (
              <option key={i} value={i}>
                Correct Option: {i + 1}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
          >
            <FiPlusCircle /> Add Question
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          {newLecture._id ? "Update Lecture" : "Save Lecture"}
        </button>
      </form>
    </div>
  );
}
