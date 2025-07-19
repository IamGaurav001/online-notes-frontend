import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, LogOut, Moon, Sun, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode")
    return saved ? JSON.parse(saved) : false
  })
  const [userName, setUserName] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const checkAuth = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null")
      const token = localStorage.getItem("token")
      
      if (user && user.name && token) {
        setIsLoggedIn(true)
        setUserName(user.name)
        console.log("User logged in:", user.name)
      } else {
        setIsLoggedIn(false)
        setUserName("")
        console.log("User not logged in")
      }
    } catch (error) {
      console.error("Error checking auth:", error)
      setIsLoggedIn(false)
      setUserName("")
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    const handleAuthChanged = () => {
      console.log("Auth changed event received")
      checkAuth()
    }
    
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === "token") {
        console.log("Storage changed:", e.key)
        checkAuth()
      }
    }

    window.addEventListener("authChanged", handleAuthChanged)
    window.addEventListener("storage", handleStorageChange)
    
    return () => {
      window.removeEventListener("authChanged", handleAuthChanged)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  
  const handleLogout = () => {
    console.log("Logging out...") 
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUserName("")
    setIsMobileMenuOpen(false)
    window.dispatchEvent(new Event("authChanged"))
    navigate("/")
  }

  console.log("Navbar state - isLoggedIn:", isLoggedIn, "userName:", userName)

  return (
    <nav className="w-full px-6 py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm  dark:border-gray-700 transition-all duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
          ThinkPad Online
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <span className="text-gray-800 dark:text-gray-200 font-medium px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                {userName}
              </span>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/community"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 font-medium"
              >
                Community
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => navigate("/login")}
                className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300"
                aria-label="Login"
                title="Login"
              >
                <User size={20} />
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-4 pt-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    Welcome, {userName}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleDarkMode}
                    className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/community"
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-center font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Community
                </Link>
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleDarkMode}
                    className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/login")
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex-1 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <User size={18} />
                    <span>Login</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

