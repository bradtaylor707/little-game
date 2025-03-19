import { random, uniqueId } from "lodash-es";
import { BrowserRouter, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "./app.scss";
import clsx from "clsx";

const GRID_SIZE = 12;

type Position = [number, number];

class Game {
  id = uniqueId("game");
  created = new Date().toISOString();
  grid: Array<Square[]> = [];
  gridSize = GRID_SIZE;
  goalX = random(GRID_SIZE - 1);
  goalY = random(GRID_SIZE - 1);

  constructor({ gridSize = GRID_SIZE } = {}) {
    this.gridSize = gridSize;

    for (let i = 0; i < GRID_SIZE; i++) {
      this.grid[i] = this.grid[i] || [];

      for (let j = 0; j < GRID_SIZE; j++) {
        const goalStatus = i === this.goalX && j === this.goalY && SquareStatus.Goal;
        const wallStatus = goalStatus === false && random(3) === 0 && SquareStatus.Wall;

        this.grid[i][j] = new Square({
          status: goalStatus || wallStatus || SquareStatus.Open,
        });
      }
    }
  }

  isOver() {
    return false;
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

  isGoal() {
    return this.status === SquareStatus.Goal;
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

  useEffect(() => {
    if (game.goalX === playerX && game.goalY === playerY) {
      alert("Game Over!");
    }
  }, [game.goalX, game.goalY, playerX, playerY]);

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
                    <div
                      key={square.id || colIndex}
                      className={clsx({
                        square: true,
                        wall: square.isWall(),
                        open: square.isOpen(),
                        goal: square.isGoal(),
                        player: rowIndex === playerX && colIndex === playerY,
                      })}
                    />
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

function sumStrings(a: string | null | undefined, b: string | null | undefined) {
  a ??= "";
  b ??= "";

  a = a.split("").reverse().join("");
  b = b.split("").reverse().join("");

  const len = Math.max(a.length, b.length);

  let carry = 0;
  let out = "";

  for (let i = 0; i < len || carry; i++) {
    const aDigit = Number(a[i] || "0");
    const bDigit = Number(b[i] || "0");

    const localSum = aDigit + bDigit + carry;

    out = (localSum % 10) + out;

    if (localSum / 10 >= 1) {
      carry = 1;
    } else {
      carry = 0;
    }
  }

  return out;
}

function StringAdder() {
  const [a, setA] = useState<string>();
  const [b, setB] = useState<string>();

  return (
    <div>
      <h2>String Adder</h2>
      <h4>Sum: {sumStrings(a, b)}</h4>
      <h5>Expected: {Number(a || 0) + Number(b || 0)}</h5>
      <div>
        <input
          type={"number"}
          onChange={(event) => {
            setA(event.target.value);
          }}
          value={a}
        />
      </div>
      <div>
        <input
          type={"number"}
          onChange={(event) => {
            setB(event.target.value);
          }}
          value={b}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className={"app"}>
        <LittleGame />
        <StringAdder />
      </main>
    </BrowserRouter>
  );
}

export default App;
