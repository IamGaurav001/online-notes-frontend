import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    const handleAuthChanged = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    window.addEventListener("authChanged", handleAuthChanged);
    return () => window.removeEventListener("authChanged", handleAuthChanged);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
      <main className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-32">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-20 gap-12 md:gap-0">
          <div className="flex-1 text-left">
            {user ? (
              <>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Welcome back, <span className="text-primary-600 dark:text-primary-400">{user.name || user.username}</span>!
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl">
                  Ready to continue where you left off?
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    Go to Dashboard
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Welcome to <span className="text-primary-600 dark:text-primary-400">ThinkPad Online</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl">
                  Capture ideas, organize thoughts, and boost productivity with a secure, modern note-taking app.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/signup"
                    className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    Get Started Free
                  </Link>
                  <Link 
                    to="/community"
                    className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    Explore Community
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="flex-1 flex justify-center md:justify-end w-full md:w-auto mt-12 md:mt-0">
            <svg width="340" height="260" viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-72 md:w-80 lg:w-[340px] h-auto">
              <rect x="30" y="40" width="280" height="180" rx="24" fill="#f3f4f6"/>
              <rect x="50" y="60" width="120" height="140" rx="12" fill="#e0e7ff"/>
              <rect x="170" y="60" width="120" height="140" rx="12" fill="#fef9c3"/>
              <rect x="60" y="80" width="100" height="10" rx="5" fill="#6366f1"/>
              <rect x="60" y="100" width="80" height="10" rx="5" fill="#6366f1" opacity="0.7"/>
              <rect x="60" y="120" width="60" height="10" rx="5" fill="#6366f1" opacity="0.5"/>
              <rect x="180" y="80" width="100" height="10" rx="5" fill="#facc15"/>
              <rect x="180" y="100" width="80" height="10" rx="5" fill="#facc15" opacity="0.7"/>
              <rect x="180" y="120" width="60" height="10" rx="5" fill="#facc15" opacity="0.5"/>
              <rect x="90" y="180" width="160" height="8" rx="4" fill="#d1d5db"/>
              <rect x="110" y="195" width="120" height="6" rx="3" fill="#d1d5db"/>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
