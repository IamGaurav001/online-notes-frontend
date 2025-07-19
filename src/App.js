import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateNotes from "./pages/CreateNotes";
import AllNotes from "./pages/AllNotes";
import UpdateNotes from "./pages/UpdateNotes";
import Community from "./pages/Community";

function App() {
       
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateNotes />} />
          <Route path="/notes" element={<AllNotes />} />
          <Route path="/update/:id" element={<UpdateNotes />} />
          <Route path="/community" element={<Community />} />
        </Routes>
    </Router>
  );
}

export default App;
