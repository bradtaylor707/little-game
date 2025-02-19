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
  const [grid] = useState(() => {
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
  const playerX = position[0];
  const playerY = position[1];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // todo: should inform some manager to move so that we can look at the adjacent spaces easier

      switch (event.code) {
        case "ArrowUp":
          setPosition(([x, y]) => {
            return [x, Math.max(0, y - 1)];
          });
          break;
        case "ArrowDown":
          setPosition(([x, y]) => {
            return [x, Math.min(GRID_SIZE - 1, y + 1)];
          });
          break;
        case "ArrowLeft":
          setPosition(([x, y]) => {
            return [Math.max(0, x - 1), y];
          });
          break;
        case "ArrowRight":
          setPosition(([x, y]) => {
            return [Math.min(GRID_SIZE - 1, x + 1), y];
          });
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
                      {rowIndex === playerX && colIndex === playerY ? "Occupied" : "Open"}
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
