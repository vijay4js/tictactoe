import { useState, useRef } from "react";

const GRID_NUM = 3;
let INIT_STATE = Array(GRID_NUM)
  .fill("X")
  .map((i) => Array(GRID_NUM).fill(null));
function Board() {
  const [squares, setSquares] = useState(() => INIT_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const numMoves = useRef(0);

  function handleGridClick(row, col) {
    if (checkWinner(squares) || squares[row][col]) {
      return;
    }
    numMoves.current = numMoves.current + 1;

    //Update squares
    let next = Object.assign([...squares], {
      [row]: Object.assign([...squares[row]], {
        [col]: currentPlayer
      })
    });

    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    setSquares(next);
  }

  function checkArr(arr) {
    return arr.every((a) => a && a === arr[0]);
  }

  function checkWinner(squares) {
    //Check rows
    for (let i = 0; i < GRID_NUM; i++) {
      if (checkArr(squares[i])) {
        return squares[i][0];
      }
    }

    //Check cols

    for (let i = 0; i < GRID_NUM; i++) {
      let col = [];
      for (let j = 0; j < GRID_NUM; j++) {
        col.push(squares[j][i]);
      }
      if (checkArr(col)) {
        return col[0];
      }
      col = [];
    }

    //Check diagonals
    let i = 0;
    let j = 0;
    let colArr = [];
    while (i < GRID_NUM && j < GRID_NUM) {
      colArr.push(squares[i++][j++]);
    }

    if (checkArr(colArr)) {
      return colArr[0];
    }

    i = 0;
    j = GRID_NUM - 1;
    colArr = [];
    while (i < GRID_NUM && j >= 0) {
      colArr.push(squares[i++][j--]);
    }

    if (checkArr(colArr)) {
      return colArr[0];
    }
  }

  function renderHeader() {
    return <div className="header"> Player 1 Turn</div>;
  }

  function renderGame() {
    return (
      <div className="game">
        {squares.map((row, id) => {
          return (
            <div key={id} className="row">
              {renderColumn(id, squares[id])}
            </div>
          );
        })}
      </div>
    );
  }

  function renderColumn(row, colArray) {
    return (
      <>
        {colArray.map((col, id) => {
          return (
            <div
              key={`${row}-${id}`}
              className="grid"
              onClick={() => handleGridClick(row, id)}
            >
              {col}
            </div>
          );
        })}
      </>
    );
  }

  function renderStatus() {
    if (checkWinner(squares)) {
      return <div>{checkWinner(squares)} won </div>;
    } else if (numMoves.current === GRID_NUM * GRID_NUM) {
      return <div>Tie bro ... Restart Madi</div>;
    } else {
      return <div>{`${currentPlayer}'s Turn`}</div>;
    }
  }

  function handleRestart() {
    setSquares(INIT_STATE);
    setCurrentPlayer("X");
    numMoves.current = 0;
  }
  function renderRestart() {
    return <button onClick={handleRestart}>Restart</button>;
  }

  return (
    <div className="container">
      {renderHeader()}
      {renderGame()}
      {renderStatus()}
      {renderRestart()}
    </div>
  );
}

export default Board;
