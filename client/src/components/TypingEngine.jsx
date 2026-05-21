import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { testService } from '../services/api';
import './TypingEngine.css';

const TEXTS = [
  "The quick brown fox jumps over the lazy dog. Programming is the art of algorithm design and the craft of debugging errant code. It requires patience and logic.",
  "In the world of software development, clean code is not just a preference, it is a necessity for maintainable systems that scale over time.",
  "Gamification makes everything better. Typing speed tests are no exception. Push your limits and reach new heights by typing as fast as you can.",
  "The most important property of a program is whether it accomplishes the intention of its user. Good programmers write code that humans can understand.",
  "There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies. The other way is more complex."
];

const TypingEngine = ({ timeLimit = 60 }) => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Generate a long text by repeating paragraphs to ensure they don't run out of text easily
    const baseText = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    setText(`${baseText} ${TEXTS[Math.floor(Math.random() * TEXTS.length)]} ${baseText}`);
    setTimeLeft(timeLimit);
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [timeLimit]);

  useEffect(() => {
    if (timeLeft === 0 && !isFinished) {
      handleFinish();
    }
  }, [timeLeft]);

  const handleFinish = async () => {
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
    
    const timeElapsed = timeLimit - timeLeft || 1; // avoid division by zero
    
    // Final recalculation just in case
    const wordsTyped = userInput.length / 5;
    const finalWpm = Math.round(wordsTyped / (timeElapsed / 60));
    setWpm(finalWpm || 0);

    let mistakesCount = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== text[i]) mistakesCount++;
    }
    
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        await testService.saveScore({
          wpm: finalWpm || 0,
          accuracy,
          mistakes: mistakesCount,
          mode: 'timed',
          difficulty: 'medium',
          duration: timeElapsed
        });
      }
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  const handleChange = (e) => {
    if (isFinished) return;
    
    const val = e.target.value;
    setUserInput(val);

    if (!startTime) {
      setStartTime(Date.now());
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Live Stats
    const timeElapsed = timeLimit - timeLeft || 1; // seconds
    const wordsTyped = val.length / 5;
    const currentWpm = Math.round(wordsTyped / (timeElapsed / 60));
    setWpm(currentWpm || 0);

    let correctChars = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === text[i]) correctChars++;
    }
    setAccuracy(Math.round((correctChars / val.length) * 100) || 100);
    
    // If they magically type the whole giant text, finish early
    if (val.length === text.length) {
      handleFinish();
    }
  };

  const resetTest = () => {
    const baseText = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    setText(`${baseText} ${TEXTS[Math.floor(Math.random() * TEXTS.length)]} ${baseText}`);
    setUserInput('');
    setStartTime(null);
    setTimeLeft(timeLimit);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="typing-engine glass-card">
      <div className="stats-header">
        <div className="stat-box">
          <span className="stat-label">WPM</span>
          <motion.span 
            className="stat-value neon-text"
            key={wpm}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {wpm}
          </motion.span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Time</span>
          <span className={`stat-value ${timeLeft < 10 ? 'neon-text-purple' : ''}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value neon-text-purple">{accuracy}%</span>
        </div>
      </div>

      <div className="typing-area" onClick={() => inputRef.current && inputRef.current.focus()}>
        <div className="text-display">
          {text.split('').map((char, index) => {
            let className = 'char';
            if (index < userInput.length) {
              className += userInput[index] === char ? ' correct' : ' incorrect';
            } else if (index === userInput.length) {
              className += ' active';
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </div>
        <input
          ref={inputRef}
          type="text"
          className="hidden-input"
          value={userInput}
          onChange={handleChange}
          autoFocus
        />
      </div>

      {isFinished && (
        <motion.div 
          className="result-overlay"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <h2 className="neon-text">Test Complete!</h2>
          <div className="final-stats">
            <div className="final-stat-item">
              <span className="final-stat-label">Speed</span>
              <span className="final-stat-value neon-text">{wpm} WPM</span>
            </div>
            <div className="final-stat-item">
              <span className="final-stat-label">Accuracy</span>
              <span className="final-stat-value neon-text-purple">{accuracy}%</span>
            </div>
          </div>
          <button className="btn btn-purple" style={{ fontSize: '1.2rem', padding: '12px 30px' }} onClick={resetTest}>
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TypingEngine;
