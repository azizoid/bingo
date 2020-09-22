import React, { useEffect, useState } from "react";
import Bingo from "./components/bingo/bingo.component";

import "./styles/app.scss";

import { startPosition, texts } from "./assets/lists";

function _hasSubArray(mainArray, subArray) {
  mainArray = new Set(mainArray);
  subArray = new Set(subArray);

  for (var element of subArray) {
    if (!mainArray.has(element)) {
      return false;
    }
  }
  return true;
}

function App() {
  const [winner, setWinner] = useState(false);
  const [cells, setCells] = useState(startPosition);

  const winningPositions = [
    [1, 2, 3, 4, 5],
    [10, 6, 7, 8, 9],
    [11, 12, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [1, 11, 16, 21, 6],
    [12, 17, 22, 2, 7],
    [18, 23, 3, 8],
    [14, 19, 24, 4, 9],
    [10, 15, 20, 25, 5],
    [1, 19, 25, 7],
    [17, 21, 5, 9],
  ];

  const onCellClick = (x) => {
    setCells((prev) => ({ ...prev, [x]: !cells[x], 13: false }));
  };

  useEffect(() => {
    setWinner(0);
    let arr = [];
    for (let i = 1; i < 26; i++) {
      if (i === 13) continue;
      if (cells[i] === true) arr.push(i);
      // console.log(i, cells[i]);
    }

    for (const winRow of winningPositions) {
      if (_hasSubArray(arr, winRow)) setWinner(1);
    }
  }, [cells, winningPositions]);

  useEffect(() => {
    console.log(winner);
  }, [winner]);

  return (
    <div className="App container">
      {winner ? <Bingo /> : ""}

      <div className="table-responsive-sm">
        <table className="table table-sm">
          <tbody>
            {[1, 2, 3, 4, 5].map((row, r) => (
              <tr key={r}>
                {[1, 2, 3, 4, 5].map((cell, c) => {
                  let num = r * 5 + (c + 1);
                  return (
                    <td
                      key={c}
                      onClick={() => onCellClick(num)}
                      className="cell"
                    >
                      <div className="num">{num - 1}</div>
                      <div
                        className="txt"
                        style={
                          cells[num] ? { textDecoration: "line-through" } : {}
                        }
                      >
                        {texts[num - 1]}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
