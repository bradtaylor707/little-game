import { random, uniqueId } from "lodash-es";
import { BrowserRouter, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "./app.scss";

const GRID_SIZE = 10;

type Position = [number, number];

class Game {
  id = uniqueId("game");
  created = new Date().toISOString();
  grid: Array<Square[]> = [];
  gridSize = GRID_SIZE;

  constructor({ gridSize = GRID_SIZE } = {}) {
    this.gridSize = gridSize;

    for (let i = 0; i < GRID_SIZE; i++) {
      this.grid[i] = this.grid[i] || [];

      for (let j = 0; j < GRID_SIZE; j++) {
        this.grid[i][j] = new Square({
          status: random(0, 10) === 0 ? SquareStatus.Wall : SquareStatus.Open,
        });
      }
    }
  }
}

enum SquareStatus {
  Open = "open",
  Wall = "wall",
  Goal = "goal",
}

class Square {
  id = uniqueId("square");
  status: SquareStatus;

  constructor({ status }: { status: SquareStatus }) {
    this.status = status;
  }

  isWall() {
    return this.status === SquareStatus.Wall;
  }

  isOpen() {
    return this.status === SquareStatus.Open;
  }
}

function LittleGame() {
  const [searchParams] = useSearchParams({ gridSize: GRID_SIZE.toString() });
  const gridSize = +(searchParams.get("gridSize") ?? GRID_SIZE);
  const game = useMemo(() => new Game({ gridSize }), [gridSize]);

  const [position, setPosition] = useState<Position>([0, 0]);
  const playerX = position[0];
  const playerY = position[1];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // todo: should inform some manager to move so that we can look at the adjacent spaces easier

      switch (event.code) {
        case "ArrowUp":
          setPosition(([x, y]) => {
            const targetY = Math.max(0, y - 1);
            const targetSquare = game.grid[x][targetY];

            if (targetSquare.isWall()) {
              return [x, y];
            }

            return [x, targetY];
          });
          break;
        case "ArrowDown":
          setPosition(([x, y]) => {
            const targetY = Math.min(GRID_SIZE - 1, y + 1);
            const targetSquare = game.grid[x][targetY];

            if (targetSquare.isWall()) {
              return [x, y];
            }

            return [x, targetY];
          });
          break;
        case "ArrowLeft":
          setPosition(([x, y]) => {
            const targetX = Math.max(0, x - 1);
            const targetSquare = game.grid[targetX][y];

            if (targetSquare.isWall()) {
              return [x, y];
            }

            return [Math.max(0, x - 1), y];
          });
          break;
        case "ArrowRight":
          setPosition(([x, y]) => {
            const targetX = Math.min(GRID_SIZE - 1, x + 1);
            const targetSquare = game.grid[targetX][y];

            if (targetSquare.isWall()) {
              return [x, y];
            }

            return [targetX, y];
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
  }, [game.grid]);

  return (
    <div className={"little-game"}>
      <div className={"debug-container"}>
        <div>Game ID: {game.id}</div>
        <div>Created: {game.created}</div>
        <div>Grid Size: {game.gridSize}</div>
      </div>
      <div className={"game-container"}>
        <div className={"game"}>
          {game.grid.map((squares, rowIndex) => {
            return (
              <div key={rowIndex} className={"row"}>
                {squares.map((square, colIndex) => {
                  return (
                    <div key={square.id || colIndex} className={"square"}>
                      {rowIndex === playerX && colIndex === playerY
                        ? "Occupied"
                        : square.isWall()
                          ? "Wall"
                          : "Open"}
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
