import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles.css";

const AdChatbot = () => {
  const navigate = useNavigate(); 

  // ▼▼▼ シナリオ設定 ▼▼▼
  const scenarios = {
    // 1. スタート画面
    intro: {
      text: "ゲストさん、こんにちは！👋\n今月のおすすめキャンペーンをご紹介します。",
      carousel: [
        {
          src: "/image/car1.png",
        },
        {
          src: "/image/car2.png",
        },
        {
          src: "/image/car3.png",
        },
        {
          src: "/image/car4.png",
        },
      ],
      selectLabel: "▼ご希望のカードは？▼",
      options: [
        { label: "ブラックカード (Black)", nextId: "black_card" },
        { label: "ゴールドカード (Gold)", nextId: "gold_card" },
      ],
    },

    // Aルート
    black_card: {
      text: "至高のステータスをお求めですね。\n最高級のサービスと優待をご用意しています。",
      image:
        "/image/black.png",
      options: [
        {
          label: "申し込みページへ ",
          url: "#",
        },
        // 
        {
          label: "ホームに戻る 🏠",
          isHome: true, 
        },
      ],
    },

    // Bルート
    gold_card: {
      text: "コストパフォーマンスとステータスの両立✨\nポイント還元率も魅力の1枚です。",
      image:
        "/image/goald.png",
      options: [
        {
          label: "詳細を見る ",
          url: "#",
        },
        {
          label: "ホームに戻る ",
          isHome: true,
        },
      ],
    },
  };

  const [currentId, setCurrentId] = useState("intro");
  const currentScenario = scenarios[currentId];

  // ボタンを押したときの処理
  const handleOptionClick = (option) => {
    if (option.isHome) {
      navigate("/"); // 👈 ホーム（トップページ）へ移動
    } else if (option.url) {
      window.open(option.url, "_blank");
    } else if (option.nextId) {
      setCurrentId(option.nextId);
    }
  };

  return (
    <div className="ad-screen-wrapper">
    <div className="ad-screen">
      <div className="chat-container">
        <div className="chat-row">
          <div className="bot-icon">💳</div>
          <div className="message-bubble">
            {currentScenario.text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>

        {currentScenario.carousel && (
          <div className="carousel-scroll">
            {currentScenario.carousel.map((item, index) => (
              <div key={index} className="carousel-card">
                <img src={item.src} alt="carousel" />
              </div>
            ))}
          </div>
        )}

        {currentScenario.image && (
          <div className="chat-row">
            <div className="bot-icon invisible">🤖</div>
            <div className="image-bubble">
              <img src={currentScenario.image} alt="content" />
            </div>
          </div>
        )}

        <div className="options-area">
          <div className="options-card">
            {currentScenario.selectLabel && (
              <div className="options-label">{currentScenario.selectLabel}</div>
            )}
            
            {currentScenario.options.map((option, index) => (
              <button
                key={index}
                className="chat-option-btn"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdChatbot;