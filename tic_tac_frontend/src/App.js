import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import ScorePanel from "./components/ScorePanel";
import GameNav from "./components/GameNav";
import { fetchScores, saveScore } from "./utils/scoreApi";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  // Game mode: "single" or "two"
  const [mode, setMode] = useState("single");
  // Players: "X" (always user one), and either "O" as user two or computer
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  // Keep track of past matches, for possible display
  const [history, setHistory] = useState([]);
  // Player names for display, can edit for two player mode
  const [playerNames, setPlayerNames] = useState({ X: "Player 1", O: "Player 2" });

  // Load scores from API/database at start and when mode changes
  useEffect(() => {
    fetchScores(mode).then((saved) => {
      if (saved) setScores(saved);
    });
  }, [mode]);

  // PUBLIC_INTERFACE
  const onGameEnd = (winner) => {
    // Update local scores and push to backend
    const updated = { ...scores };
    if (winner === "tie") updated.ties += 1;
    else if (winner) updated[winner] += 1;
    setScores(updated);
    setHistory([...history, winner]);
    saveScore(mode, updated); // async
  };

  // PUBLIC_INTERFACE
  const onModeChange = (newMode) => {
    setMode(newMode);
    setScores({ X: 0, O: 0, ties: 0 }); // Reset display, will reload from API
    setHistory([]);
    setPlayerNames({
      X: "Player 1",
      O: newMode === "two" ? "Player 2" : "Computer"
    });
  };

  // PUBLIC_INTERFACE
  const onNameChange = (symbol, newName) => {
    setPlayerNames((cur) => ({ ...cur, [symbol]: newName }));
  };

  // PUBLIC_INTERFACE
  const onResetScores = () => {
    const reset = { X: 0, O: 0, ties: 0 };
    setScores(reset);
    setHistory([]);
    saveScore(mode, reset);
  };

  return (
    <div className="tic-tac-container">
      <GameNav
        activeMode={mode}
        onModeChange={onModeChange}
        playerNames={playerNames}
        onNameChange={onNameChange}
      />
      <main className="main-game-layout">
        <div className="centered-board">
          <GameBoard
            mode={mode}
            playerNames={playerNames}
            onGameEnd={onGameEnd}
          />
        </div>
        <ScorePanel
          scores={scores}
          playerNames={playerNames}
          onResetScores={onResetScores}
          className="side-score"
        />
      </main>
      <footer className="game-footer">
        <span>
          View source or learn about React{" "}
          <a
            href="https://react.dev/"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >here</a>
        </span>
      </footer>
    </div>
  );
}

export default App;
