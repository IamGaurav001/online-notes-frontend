

export default function Home() {

  return (
    
<div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300">

      <section className="pt-24 pb-20 px-6 md:px-10 lg:px-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
          Simplify Your Notes, <br className="hidden md:block" />
          Stay Organized.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
          A modern online note-taking app to organize thoughts, store ideas, and boost your productivity — anywhere, anytime.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg transition">
            <a href="./Login">Get Started</a>
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-xl text-lg transition">
            Learn More
          </button>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 lg:px-32 bg-gray-100 dark:bg-gray-900 transition-colors">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Fast & Secure</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your notes are encrypted and synced instantly for safe access anywhere.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Beautiful UI</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enjoy a distraction-free, clean interface with dark/light mode.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Always Organized</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tags, filters, and search make finding your notes effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </footer>
    </div>
  )
}
