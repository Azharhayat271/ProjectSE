import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weclome from "./components/pages/home";
import Register from "./components/pages/register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Weclome />} />
          <Route path="/register" element={<Register />} />

        </Routes>{" "}
      </Router>
    </>
  );
}

export default App;
