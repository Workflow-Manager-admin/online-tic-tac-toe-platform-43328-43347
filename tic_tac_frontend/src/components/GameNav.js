import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function GameNav({ activeMode, onModeChange, playerNames, onNameChange }) {
  const handleMode = (e) => {
    onModeChange(e.target.value);
  };

  // Allow editing only Player 2 name in two-player mode
  return (
    <nav className="game-nav">
      <div className="app-title">
        <span className="emoji">🎮</span>
        <span className="ttt-title">Tic Tac Toe Online</span>
      </div>
      <div className="mode-toggle">
        <button
          className={activeMode === "single" ? "active" : ""}
          value="single"
          onClick={handleMode}
          aria-label="Single player"
        >
          1 Player
        </button>
        <button
          className={activeMode === "two" ? "active" : ""}
          value="two"
          onClick={handleMode}
          aria-label="Two player"
        >
          2 Players
        </button>
      </div>
      <div className="name-fields">
        <span>
          <input
            type="text"
            value={playerNames.X}
            className="name-input"
            onChange={(e) => onNameChange("X", e.target.value)}
            aria-label="Player 1 name"
          />
          <span className="x-symbol">X</span>
        </span>
        <span>
          <input
            type="text"
            value={playerNames.O}
            className="name-input"
            onChange={(e) => onNameChange("O", e.target.value)}
            aria-label="Player 2 or Computer name"
            disabled={activeMode !== "two"}
          />
          <span className="o-symbol">O</span>
        </span>
      </div>
    </nav>
  );
}

export default GameNav;
