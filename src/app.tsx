import { BrowserRouter, Route, Routes } from "react-router";
import AddStrings from "./pages/add-strings";
import Home from "./pages/home";
import Maze from "./pages/maze";
import Jotai from "./pages/jotai";
import Todos from "./pages/todos";
import Todos2 from "./pages/todos-2";
import "./app.scss";

function App() {
  return (
    <main className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route index={true} element={<Home />} />
          <Route path={"add-strings"} element={<AddStrings />} />
          <Route path={"maze"} element={<Maze />} />
          <Route path={"jotai"} element={<Jotai />} />
          <Route path={"todos"} element={<Todos />} />
          <Route path={"todos2"} element={<Todos2 />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
