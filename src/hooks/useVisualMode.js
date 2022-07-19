import { useState } from "react";

export default function useVisualMode(initialMode) {
  // set mode state with inital value
  const [mode, setMode] = useState(initialMode);
  // create a history array to track our mode history => initial mode as the ZEROith index
  const [history, setHistory] = useState([initialMode]);

  // function to set new mode
  const transition = (newMode, replace = false) => {
    // if replace is true => remove most recent mode from history array and current mode
    if (replace) {
      setMode(newMode);
      setHistory((prev) => {
        return [...prev.slice(0, prev.length - 1), mode]
      })
    } else {
      // set state to new mode and add mode to history array
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  };
  // got back in history array by removing last mode 
  function back() {
    if (history.length === 1) {
      return
    } else {
      const temp = history;
      temp.pop()
      setHistory(temp)
      setMode(temp[temp.length - 1])
    }
  };

  return {
    mode,
    transition,
    back
  };
};

