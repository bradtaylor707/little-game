import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./app.scss";
import { BrowserRouter, useSearchParams } from "react-router";

function LittleGuy() {
  const [searchParams, setSearchParams] = useSearchParams({ count: (0).toString() });
  const count = +(searchParams.get("count") ?? 0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Little Game</h1>
      <div className="card">
        <button
          onClick={() => {
            const nextCount = count + 1;

            setSearchParams((prev) => {
              prev.set("count", nextCount.toString());

              return prev;
            });
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="app">
        <LittleGuy />
      </main>
    </BrowserRouter>
  );
}

export default App;
