import React, { useEffect, useState } from "react";
import { Users, Calendar, Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";

const Community = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/api/notes/public`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError("Could not load community notes.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Users className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Community Notes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover amazing content shared by our community of thinkers and creators
          </p>
        </div>


        {/* Notes Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading community notes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-red-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No public notes yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Be the first to share your knowledge with the community!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                {/* Note Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {note.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 ml-2">
                    Public
                  </span>
                </div>
                
                {/* Note Content */}
                <p className="text-gray-600 dark:text-gray-300 line-clamp-4 mb-4">
                  {note.content}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                          {(note.user?.username || 'Anonymous').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">
                        {note.user?.username || 'Anonymous'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
              
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Community Guidelines */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-200 dark:border-primary-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Community Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">Share valuable insights and knowledge</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">Be respectful and constructive</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">Give proper credit when referencing others</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">Avoid spam or promotional content</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">Don't share personal or sensitive information</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">Respect intellectual property rights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
