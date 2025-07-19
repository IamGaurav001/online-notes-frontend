import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, Users, FileText, TrendingUp, Calendar } from "lucide-react";

const getInitials = (name = "") => {
  if (!name) return "U";
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/api/notes`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError("Could not load notes.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 204) {
        setNotes(notes.filter((n) => n._id !== id));
      } else {
        alert("Failed to delete note.");
      }
    } catch {
      alert("Error deleting note.");
    }
  };

  // Stats
  const totalNotes = notes.length;
  const publicNotes = notes.filter((n) => n.isPublic).length;
  const privateNotes = notes.filter((n) => !n.isPublic).length;
  const recentNotes = notes.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {getInitials(user.name || user.username)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user.name || user.username}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Here's what's happening with your notes
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              Create Note
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Notes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalNotes}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                <FileText className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Public Notes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{publicNotes}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-xl flex items-center justify-center">
                <Users className="text-secondary-600 dark:text-secondary-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Private Notes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{privateNotes}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center">
                <Eye className="text-accent-600 dark:text-accent-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Notes Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Notes</h2>
            <Link 
              to="/notes" 
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
            >
              View All Notes
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading your notes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : recentNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notes yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Start by creating your first note!</p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200"
              >
                <Plus size={20} />
                Create Your First Note
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentNotes.map((note) => (
                <div key={note._id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {note.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      note.isPublic 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}>
                      {note.isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {note.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={16} />
                      <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/update/${note._id}`}
                        className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                        title="Edit Note"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        title="Delete Note"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;