import React, { useState } from "react";
interface SquaresProp {
  value: string;
  onSquareClick(): void;
}
interface BoardProps {
  xIsNext: boolean;
  squares: any[];
  onPlay(nextSquare: any[]): void;
}
const Squares: React.FC<SquaresProp> = ({ value, onSquareClick }) => {
  return <button onClick={onSquareClick}>{value}</button>;
};
const Boards: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i: number) => {
    if (CalculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";
    onPlay(nextSquares);
  };
  const winner = CalculateWinner(squares);
  let status: string;
  if (winner) status = "Winner: " + winner;
  else status = " Next Player: " + xIsNext ? "X" : "O";
  return (
    <>
      {/* status */}
      <div>{status}</div>
      {/* Board Row */}
      <div className="board-row">
        <Squares value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Squares value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Squares value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Squares value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Squares value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Squares value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Squares value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Squares value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Squares value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      {/* Board Row */}
    </>
  );
};
const HomeLayout = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove + 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquare: any[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description: string;
    if (move > 0) description = "Go to move *" + move;
    else description = "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div>
      <div>
        <Boards
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div>
        <h1>Moves Taken</h1>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

function CalculateWinner(squares: any[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log("lines index Values", a, b, c, i, squares[i], squares);
    if (squares[a] && squares[b] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}
export default HomeLayout;
