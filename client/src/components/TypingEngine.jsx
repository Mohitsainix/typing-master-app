import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { testService } from '../services/api';
import './TypingEngine.css';

const TEXTS = [
  "The quick brown fox jumps over the lazy dog. Programming is the art of algorithm design and the craft of debugging errant code.",
  "In the world of software development, clean code is not just a preference, it is a necessity for maintainable systems.",
  "Gamification makes everything better. Typing speed tests are no exception. Push your limits and reach new heights."
];

const TypingEngine = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(TEXTS[Math.floor(Math.random() * TEXTS.length)]);
  }, []);

  useEffect(() => {
    const handleFinish = async () => {
      if (userInput.length === text.length && text.length > 0 && !isFinished) {
        setIsFinished(true);
        
        const timeElapsed = (Date.now() - startTime) / 1000; // in seconds
        let mistakesCount = 0;
        for (let i = 0; i < userInput.length; i++) {
          if (userInput[i] !== text[i]) mistakesCount++;
        }
        
        try {
          const userInfo = localStorage.getItem('userInfo');
          if (userInfo) {
            await testService.saveScore({
              wpm,
              accuracy,
              mistakes: mistakesCount,
              mode: 'paragraph',
              difficulty: 'medium',
              duration: timeElapsed
            });
          }
        } catch (error) {
          console.error("Failed to save score:", error);
        }
      }
    };
    handleFinish();
  }, [userInput, text, isFinished, startTime, wpm, accuracy]);
    
    if (userInput.length > 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput.length > 0) {
      const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
      const wordsTyped = userInput.length / 5;
      const currentWpm = Math.round(wordsTyped / timeElapsed);
      setWpm(currentWpm || 0);

      let correctChars = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === text[i]) correctChars++;
      }
      setAccuracy(Math.round((correctChars / userInput.length) * 100) || 100);
    }
  }, [userInput, text, startTime]);

  const handleChange = (e) => {
    if (!isFinished) {
      setUserInput(e.target.value);
    }
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setText(TEXTS[Math.floor(Math.random() * TEXTS.length)]);
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
          className="result-overlay glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="neon-text">Test Complete!</h2>
          <div className="final-stats">
            <p>Speed: {wpm} WPM</p>
            <p>Accuracy: {accuracy}%</p>
          </div>
          <button className="btn btn-purple" onClick={resetTest}>Try Again</button>
        </motion.div>
      )}
    </div>
  );
};

export default TypingEngine;
