import React from "react";
// ページ切り替え機能（ルーター）を読み込み
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 各ページの部品を読み込み
import Home from "./Home";
import Diagnosis from "./Diagnosis";
import AdChatbot from "./AdChatbot";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* URLが「/」のときは Home を表示 */}
        <Route path="/" element={<Home />} />
        
        {/* URLが「/diagnosis」のときは 性格診断だけ を表示 */}
        <Route path="/diagnosis" element={<Diagnosis />} />

        {/* URLが「/ad-chatbot」のときは 広告ボットだけ を表示 */}
        <Route path="/ad-chatbot" element={<AdChatbot />} />
      </Routes>
    </Router>
  );
}