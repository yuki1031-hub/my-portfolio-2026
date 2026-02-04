import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 各ページを読み込み
import Home from './Home';
import Diagnosis from './Diagnosis';   // 性格診断のファイル名に合わせてください
import AdChatbot from './AdChatbot';   // 広告チャットのファイル名に合わせてください

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* トップページ (ポートフォリオ) */}
          <Route path="/" element={<Home />} />
          
          {/* 性格診断ページ (/diagnosis でアクセス) */}
          <Route path="/diagnosis" element={<Diagnosis />} />
          
          {/* 広告チャットボットページ (/ad-chat でアクセス) */}
          <Route path="/ad-chat" element={<AdChatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;