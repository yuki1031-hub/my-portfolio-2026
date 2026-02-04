import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Diagnosis from "./Diagnosis";
import AdChatbot from "./AdChatbot";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/ad-chatbot" element={<AdChatbot />} />
      </Routes>
    </Router>
  );
}