import React, { useState, useEffect, useRef } from 'react';
import { useRouteProtection } from '../store/RouteContext';
import { useWheel } from '../store/WheelContext';

const SAMPLE_TEXTS = [
  "What is real? How do you define real? If you're talking about what you can feel, what you can smell, taste and see, then real is simply signals.",
  
  "The Matrix is a system, Neo. That system is our enemy. When you look around, what do you see? People living their daily lives.",
  
  "I'm trying to free your mind, Neo. But I can only show you the door. You must walk through it yourself.",
  
  "Have you ever had a dream that felt so real? How would you know the difference between dreams and reality?",
  
  "Take the blue pill and stay asleep. Take the red pill and see how deep the rabbit hole goes.",

  "The Matrix is everywhere, it is all around us. Every day we walk past it, unaware of its presence.",
  
  "The very minds of the people we are trying to save. Until we do, these people are still a part of that system.",
  
  "Every keystroke brings you closer to reality. The truth is waiting to be discovered.",
  
  "Your fingers on these keys are the only truth. The real world exists beyond this illusion.",
  
  "Remember, all I'm offering is the truth, nothing more. The choice to see it is yours."
];

const TIME_LIMIT = 60; // 60 seconds = 1 minute

const TypingGame = ({ onClose }) => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  
  const { setAllowedRoute } = useRouteProtection();
  const { setShow } = useWheel();

  useEffect(() => {
    // Randomly select a text when component mounts
    setText(SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStart = () => {
    setHasStarted(true);
    setStartTime(Date.now());
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishGame = () => {
    const finalWpm = calculateWPM(Date.now());
    setWpm(finalWpm);
    setIsFinished(true);

    // If WPM is over 30, unlock all routes
    if (finalWpm >= 30) {
      localStorage.setItem('matrixEscaped', 'true');
      setAllowedRoute('*'); // Allow all routes
      setShow(false); // Hide the wheel
    }
  };

  const calculateWPM = (endTime) => {
    const timeInMinutes = (endTime - startTime) / 60000; // Convert to minutes
    const words = userInput.trim().split(/\s+/).length;
    return Math.round(words / timeInMinutes);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    // Check if typing is complete
    if (value === text) {
      if (timerRef.current) clearInterval(timerRef.current);
      finishGame();
    }
  };

  // Prevent paste
  const handlePaste = (e) => {
    e.preventDefault();
    // Optional: Show a message to the user
    alert("Nice try! But you need to type it yourself to escape the Matrix.");
  };

  // Prevent right click
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const getTypingProgress = () => {
    const correctChars = text.split('').filter((char, index) => userInput[index] === char).length;
    return (correctChars / text.length) * 100;
  };

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-green-300 font-mono">
      {!hasStarted ? (
        <div className="text-center">
          <p className="mb-4">Ready to test your skills? You have 1 minute!</p>
          <button
            onClick={handleStart}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500 transition-colors"
          >
            Start Typing
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-4">
            <span className="text-xl font-bold">Time Left: {formatTime(timeLeft)}</span>
          </div>

          <div className="mb-6 p-4 bg-black/50 rounded border border-green-500">
            <p className="text-lg mb-2">{text}</p>
          </div>

          <div className="mb-4">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onPaste={handlePaste}
              onContextMenu={handleContextMenu}
              disabled={isFinished}
              className="w-full p-2 bg-black/30 border border-green-500 rounded text-green-300 focus:outline-none focus:border-green-400"
              placeholder="Start typing..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-sm">
              Progress: {Math.round(getTypingProgress())}%
            </div>
            {wpm > 0 && (
              <div className="text-sm">
                Speed: {wpm} WPM
              </div>
            )}
          </div>

          {isFinished && (
            <div className="text-center mt-6">
              {wpm >= 30 ? (
                <div className="text-green-400">
                  <h3 className="text-xl font-bold mb-2">Matrix Escaped! 🎉</h3>
                  <p>You've proven worthy. All routes are now unlocked.</p>
                </div>
              ) : (
                <div className="text-red-400">
                  <h3 className="text-xl font-bold mb-2">Not Fast Enough</h3>
                  <p>You need 30 WPM to escape. Try again!</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TypingGame; 