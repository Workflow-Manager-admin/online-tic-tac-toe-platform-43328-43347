import React, { useState, useEffect } from "react";
import "../App.css";

const initialBoard = Array(9).fill(null);

// PUBLIC_INTERFACE
function GameBoard({ mode, playerNames, onGameEnd }) {
  const [squares, setSquares] = useState(initialBoard);
  const [next, setNext] = useState("X");
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setSquares(initialBoard);
    setNext("X");
    setStatus("");
    setDisabled(false);
  }, [mode, playerNames.X, playerNames.O]);

  useEffect(() => {
    // Computer turn, only for "single" mode, if O to play and not finished
    if (mode === "single" && next === "O" && !calculateWinner(squares)) {
      setDisabled(true);
      const move = findBestMove(squares, "O");
      setTimeout(() => {
        handleMove(move, "O");
        setDisabled(false);
      }, 650);
    }
    // eslint-disable-next-line
  }, [next, mode, squares]);

  function handleClick(idx) {
    if (disabled || squares[idx] || calculateWinner(squares) || status) return;
    handleMove(idx, next);
  }

  function handleMove(idx, symbol) {
    const newSq = squares.slice();
    newSq[idx] = symbol;
    setSquares(newSq);

    const winner = calculateWinner(newSq);
    if (winner) {
      setStatus(winner === "tie" ? "It's a tie!" : `${symbol === "X" ? playerNames.X : playerNames.O} wins!`);
      setTimeout(() => onGameEnd(winner), 800);
      setDisabled(true);
      return;
    }
    // Switch player
    setNext(symbol === "X" ? "O" : "X");
  }

  // Helper logic
  function renderSquare(i) {
    return (
      <button
        className={`ttt-square ${squares[i] ? "filled" : ""}`}
        aria-label={`Board square ${i + 1}`}
        onClick={() => handleClick(i)}
        disabled={!!squares[i] || disabled || !!status}
      >
        {squares[i]}
      </button>
    );
  }

  function resetGame() {
    setSquares(initialBoard);
    setNext("X");
    setStatus("");
    setDisabled(false);
  }

  // Draw grid
  return (
    <div className="game-board">
      <div className="board-header">
        <span>Now playing:</span>
        <span className={`mini-symbol ${next === "X" ? "x-symbol" : "o-symbol"}`}>{next}</span>
        <span>{next === "X" ? playerNames.X : playerNames.O}</span>
      </div>
      <div className="board-grid">
        {[0, 1, 2].map((r) => (
          <div key={r} className="board-row">
            {[0, 1, 2].map((c) => renderSquare(r * 3 + c))}
          </div>
        ))}
      </div>
      <div className="board-footer">
        {status ? <div className="game-status">{status}</div> : null}
        <button className="reset-btn" onClick={resetGame} disabled={!squares.some(Boolean) || status === ""}>
          New Game
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6], // Diags
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Check tie (board full, no winner)
  if (squares.every(Boolean)) return "tie";
  return null;
}

// Simple computer: block/win, else random empty
function findBestMove(squares, computer) {
  const human = computer === "X" ? "O" : "X";
  // Try to win
  for (let i = 0; i < 9; ++i) {
    if (!squares[i]) {
      const attempt = squares.slice();
      attempt[i] = computer;
      if (calculateWinner(attempt) === computer) return i;
    }
  }
  // Block human win
  for (let i = 0; i < 9; ++i) {
    if (!squares[i]) {
      const attempt = squares.slice();
      attempt[i] = human;
      if (calculateWinner(attempt) === human) return i;
    }
  }
  // Otherwise, center if open, else random empty
  if (!squares[4]) return 4;
  const empties = squares.map((s, i) => s ? null : i).filter((v) => v !== null);
  if (empties.length === 0) return 0; // defensive
  return empties[Math.floor(Math.random() * empties.length)];
}

export default GameBoard;
