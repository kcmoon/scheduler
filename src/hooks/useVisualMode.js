import { useState } from "react";

export default function useVisualMode(initialMode) {
  // create a history array to track our mode history => initial mode as the ZEROith index
  const [history, setHistory] = useState([initialMode]);

  // function to set new mode
  function transition(newMode, replace = false) {
    setHistory((prev) => {
      return replace ? [...prev.slice(0, prev.length - 1), newMode] : [...prev, newMode];
    });
  };

  // go back in history array by removing last mode
  function back() {
    setHistory((prev) => {
      return history.length > 1 ? prev.slice(0, prev.length - 1) : prev;
    });
  };

  return {
    mode: history[history.length - 1], 
    transition, 
    back
  };
};

