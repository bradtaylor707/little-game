import { uniqueId } from "lodash-es";
import { BrowserRouter } from "react-router";
import { useEffect, useState } from "react";
import "./app.scss";

const GRID_SIZE = 10;

enum Status {
  Open,
  Occupied,
}

class Square {
  id = uniqueId("square");

  constructor(public status: Status = Status.Open) {}
}

function LittleGame() {
  const [grid, _setGrid] = useState(() => {
    const _grid: Array<Square[]> = [];

    for (let i = 0; i < GRID_SIZE; i++) {
      _grid[i] = _grid[i] || [];

      for (let j = 0; j < GRID_SIZE; j++) {
        _grid[i][j] = new Square();
      }
    }

    return _grid;
  });

  const [position, setPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // todo: should inform some manager to move so that we can look at the adjacent spaces easier

      switch (event.code) {
        case "ArrowUp":
          debugger;
          break;
        case "ArrowDown":
          break;
        case "ArrowLeft":
          break;
        case "ArrowRight":
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className={"little-game"}>
      <div className={"debug-container"}>
        <div>Grid Size: {GRID_SIZE}</div>
      </div>
      <div className={"game-container"}>
        <div className={"game"}>
          {grid.map((squares, rowIndex) => {
            return (
              <div key={rowIndex} className={"row"}>
                {squares.map((square, colIndex) => {
                  return (
                    <div key={square.id || colIndex} className={"square"}>
                      Square: {square.status}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className={"app"}>
        <LittleGame />
      </main>
    </BrowserRouter>
  );
}

export default App;
