import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function ScorePanel({ scores, playerNames, onResetScores, className }) {
  return (
    <aside className={`score-panel ${className || ""}`}>
      <h2>Score</h2>
      <div className="scores">
        <div className="score-row">
          <span className="score-symbol x-symbol">X</span>
          <span className="score-name">{playerNames.X}</span>
          <span className="score-value">{scores.X}</span>
        </div>
        <div className="score-row">
          <span className="score-symbol o-symbol">O</span>
          <span className="score-name">{playerNames.O}</span>
          <span className="score-value">{scores.O}</span>
        </div>
        <div className="score-row tie-row">
          <span className="score-symbol tie-symbol">＝</span>
          <span className="score-name">Ties</span>
          <span className="score-value">{scores.ties}</span>
        </div>
      </div>
      <button className="reset-btn" onClick={onResetScores}>
        Reset Scores
      </button>
    </aside>
  );
}

export default ScorePanel;
