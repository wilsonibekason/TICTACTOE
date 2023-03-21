import React, { useState } from "react";
import { AiOutlinePlus, BiPlus, AiFillCiCircle } from "react-icons/all";
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
  return (
    <button
      onClick={onSquareClick}
      className="w-12 h-12 border-2 border-gray-100 flex justify-center items-center"
    >
      {value}
    </button>
  );
};
const Boards: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i: number) => {
    if (CalculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[i] = <AiOutlinePlus />;
    else nextSquares[i] = <AiFillCiCircle />;
    onPlay(nextSquares);
  };
  const winner = CalculateWinner(squares);
  let status: any;
  if (winner) status = "Winner: " + winner;
  else
    status =
      " Next Player: " + xIsNext ? <AiOutlinePlus /> : <AiFillCiCircle />;
  return (
    <>
      {/* status */}
      <div>{status}</div>
      {/* Board Row */}
      <div className="my-10 grid grid-cols-3 w-80 gap-y-4">
        {squares.map((square, i) => (
          <Squares
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
      {/* <div className="flex flex-col space-y-5">
        <div className="board-row ">
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
      </div> */}

      {/* Board Row */}
    </>
  );
};
const HomeLayout = () => {
  const [history, setHistory] = useState([Array(12).fill(null)]);
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
    console.log();

    let description: string;
    if (move > 0) description = "Go to move * " + move;
    // else if (move < 2) description = "CLEAR moves history";
    else description = "Go to game start";
    return (
      <>
        <li key={move} className="">
          <button onClick={() => jumpTo(move)} className="text-sm">
            {description}
          </button>
        </li>
      </>
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
        <h1 className="text-sm tracking-wide font-semibold my-5 font-roman">
          Moves Taken
        </h1>
        {/* <div className="cube">
          <div className="top"></div>
          <div>
            <span id="--i:0;">youtube.com/programmerRimon</span>
            <span id="--i:1;">youtube.com/programmerRimon</span>
            <span id="--i:2;">youtube.com/programmerRimon</span>
            <span id="--i:3;">youtube.com/programmerRimon</span>
          </div>
        </div> */}
        <ul className="grid grid-cols-4 gap-4 p-5 bg-slate-600 font-roman rounded-2xl shadow-2xl">
          {moves}
        </ul>
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

const consoleOBJ = {
  name: "wilson",
  age: 20,
  location: { zip: 20 },
};

// //// Comprehensive list of console properties and methods in Javascript
// // writes an error message to the console if the condition is false
// console.assert(false, "");
// // clears the console
// console.clear();
// // logs the number of times that this particulae call to `count()` has been called
// console.count("");
// // Displays a message with the optional objects to tje consoole with the log level debug
// console.debug({});
// // Displays an interactive list of properties of a specified JS OBJ
// console.dir(consoleOBJ);
// /// Displays an HTML element tree of the specified node
// console.dirxml(consoleOBJ);s
// // Writes an error to the console
// console.error([]);
// // alias for console.error
// console.group("hello");
// /// created a ew inline-group, indenting all followning output by another level
// console.groupCollapsed("he");
// // exit inline group
// console.groupEnd();
// // infromative logging of information
// console.info(consoleOBJ);
// /// maks timeline
// console.table(consoleOBJ);

export default HomeLayout;
