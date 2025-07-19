import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, Users, Calendar, Search, Filter, FileText, SortAsc, SortDesc } from "lucide-react";

const AllNotes = () => {
  const token = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [sortBy, setSortBy] = useState("newest"); 
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
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

  const userId = JSON.parse(localStorage.getItem("user"))?.id || JSON.parse(localStorage.getItem("user"))?._id;
  const myNotes = notes.filter((note) => note.user === userId);
  
  const sortNotes = (notesToSort) => {
    const sortedNotes = [...notesToSort];
    
    switch (sortBy) {
      case "newest":
        return sortedNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return sortedNotes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "recently-updated":
        return sortedNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      case "oldest-updated":
        return sortedNotes.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      default:
        return sortedNotes;
    }
  };
  
  const filteredNotes = myNotes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || 
                         (filter === "public" && note.isPublic) ||
                         (filter === "private" && !note.isPublic);
    return matchesSearch && matchesFilter;
  });

  const sortedAndFilteredNotes = sortNotes(filteredNotes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Notes</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage and organize all your notes in one place
            </p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mt-4 md:mt-0"
          >
            <Plus size={20} />
            Create Note
          </Link>
        </div>

        {/* Search, Filter, and Sort */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="all">All Notes</option>
                <option value="public">Public Notes</option>
                <option value="private">Private Notes</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="recently-updated">Recently Updated</option>
                <option value="oldest-updated">Oldest Updated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {!loading && !error && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {sortedAndFilteredNotes.length} of {myNotes.length} notes
              {searchTerm && ` matching "${searchTerm}"`}
              {filter !== "all" && ` (${filter} only)`}
            </p>
          </div>
        )}

        {/* Notes List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading your notes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : sortedAndFilteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm || filter !== "all" ? "No notes found" : "No notes yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || filter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Start by creating your first note!"
              }
            </p>
            {!searchTerm && filter === "all" && (
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
              >
                <Plus size={20} />
                Create Your First Note
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAndFilteredNotes.map((note) => (
              <div key={note._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                    {note.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ml-2 ${
                    note.isPublic 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}>
                    {note.isPublic ? "Public" : "Private"}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 line-clamp-4 mb-4">
                  {note.content}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar size={16} />
                  <span>
                    {sortBy.includes("updated") 
                      ? `Updated: ${new Date(note.updatedAt).toLocaleDateString()}`
                      : `Created: ${new Date(note.createdAt).toLocaleDateString()}`
                    }
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    to={`/update/${note._id}`}
                    className="flex-1 p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit size={16} />
                    <span className="text-sm font-medium">Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="flex-1 p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 size={16} />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && !error && myNotes.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{myNotes.length}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Notes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {myNotes.filter(n => n.isPublic).length}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Public Notes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {myNotes.filter(n => !n.isPublic).length}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Private Notes</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotes;