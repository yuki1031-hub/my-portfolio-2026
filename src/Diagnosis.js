import { useState, useEffect } from "react";
import liff from "@line/liff"; 
import "./styles.css";

const COMMON_OPTIONS = [
  { text: "非常にそう思う ", score: 4 },
  { text: "そう思う ", score: 3 },
  { text: "そう思わない ", score: 2 },
  { text: "全くそう思わない ", score: 1 },
];

const questions = [
  { id: 1, text: "休日は家でゆっくりするよりも、外に出かけたい派だ " },
  { id: 2, text: "初対面の人とも緊張せずに話せる方だ " },
  { id: 3, text: "レストランのメニューは直感で即決する " },
  { id: 4, text: "計画を立てて行動するより、その場のノリが大事だ " },
  { id: 5, text: "一人で作業するより、チームでワイワイやるのが好きだ " },
  { id: 6, text: "新しいガジェットや流行りの店にはすぐに飛びつく " },
  { id: 7, text: "感情が顔に出やすいと言われることがある " },
  { id: 8, text: "リスクがあっても、リターンが大きい勝負を選びたい " },
  { id: 9, text: "過去の失敗をいつまでも引きずらない方だ " },
];

const results = [
  { type: "A", title: "織田信長でした🌈", image: "/image/type-a.png", minScore: 0, maxScore: 4 },
  { type: "B", title: "坂本龍馬でした🌈", image: "/image/type-b.png", minScore: 5, maxScore: 8 },
  { type: "C", title: "諸葛孔明でした🌈", image: "/image/type-c.png", minScore: 9, maxScore: 12 },
  { type: "D", title: "豊臣秀吉でした🌈", image: "/image/type-d.png", minScore: 13, maxScore: 16 },
  { type: "E", title: "ダ・ヴィンチでした🌈", image: "/image/type-e.png", minScore: 17, maxScore: 20 },
  { type: "F", title: "ナイチンゲールでした🌈", image: "/image/type-n.png", minScore: 21, maxScore: 24 },
  { type: "G", title: "エジソンでした🌈", image: "/image/type-g.png", minScore: 25, maxScore: 28 },
  { type: "H", title: "マリー・アントワネットでした🌈", image: "/image/type-h.png", minScore: 29, maxScore: 999 },
];

export default function Diagnosis() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finishedResult, setFinishedResult] = useState(null);
  const [userName, setUserName] = useState("ゲスト");

  useEffect(() => {
    liff
      .init({ liffId: "2009029412-d1KRC9Mp" })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            setUserName(profile.displayName);
          }).catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleStart = () => setIsStarted(true);
  const handleRestart = () => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setFinishedResult(null);
  };
  const handleClickAnswer = (optionScore) => {
    const newScore = score + optionScore;
    setScore(newScore);
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      const result = results.find((r) => newScore >= r.minScore && newScore <= r.maxScore);
      setFinishedResult(result);
    }
  };

  return (
    <div className="diagnosis-app-wrapper">
      
      <div className="diagnosis-container">
        
        <div className="App">
          {finishedResult ? (
            /* 結果画面 */
            <div className="result-screen">
              <h2>{userName}さんは<br />{finishedResult.title}</h2>
              <img src={finishedResult.image} alt={finishedResult.title} className="result-image" />
              <div style={{ marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "20px", width: "100%" }}>
                <button onClick={handleRestart} className="restart-btn">最初から診断しなおす👀</button>
              </div>
            </div>
          ) : !isStarted ? (
            /* スタート画面 */
            <div className="start-screen">
              <div className="line-icon">👻</div>
              <div className="speech-bubble">
                <p>こんにちは！{userName}さん✨</p>
                <p>あなたの性格を9つの質問で診断します💡</p>
                <p>悩まずに直観的に選んでください！👇</p>
              </div>
              <img src="/image/start.png" alt="スタート" className="main-image" />
              <button onClick={handleStart} className="start-btn">診断をスタートする 🚀</button>
            </div>
          ) : (
            /* 質問画面 */
            <div className="question-screen" key={currentQuestionIndex}>
              <div className="line-icon">👻</div>
              <div className="speech-bubble">
                <div className="progress-text">Q.{questions[currentQuestionIndex].id} / {questions.length}</div>
                <h2 className="question-text">{questions[currentQuestionIndex].text}</h2>
              </div>
              <div className="button-container">
                {COMMON_OPTIONS.map((option) => (
                  <button key={option.text} onClick={() => handleClickAnswer(option.score)} className="diagnosis-option-btn">
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}