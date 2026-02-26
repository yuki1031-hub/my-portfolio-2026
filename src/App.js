import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Diagnosis from "./Diagnosis";
import AdChatbot from "./AdChatbot";
import DeployProjects from "./DeployProjects";
import FigmaLayerToYaml from "./projects/FigmaLayerToYaml";
import PersonalityDiagnosis from "./projects/PersonalityDiagnosis";
import FoodSwipe from "./projects/FoodSwipe";
import Contact from "./Contact";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deploy-projects" element={<DeployProjects />} />
        <Route path="/projects/figma-layer-to-yaml" element={<FigmaLayerToYaml />} />
        <Route path="/projects/personality-diagnosis" element={<PersonalityDiagnosis />} />
        <Route path="/projects/food-swipe" element={<FoodSwipe />} />
        <Route path="/contact" element={<Contact />} />
        {/* Legacy demo pages */}
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/ad-chatbot" element={<AdChatbot />} />
      </Routes>
    </Router>
  );
}