import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weclome from "./components/pages/home";
import Register from "./components/pages/register";
import About from "./components/pages/showstudent";
import Edit from "./components/pages/editstudent";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Weclome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:userId" element={<Edit />} />
          

          

        </Routes>{" "}
      </Router>
    </>
  );
}

export default App;
