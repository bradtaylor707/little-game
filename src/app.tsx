import { Route, Routes } from "react-router";
import AddStrings from "./pages/add-strings";
import Home from "./pages/home";
import Maze from "./pages/maze";
import "./app.scss";

function App() {
  return (
    <main className={"app"}>
      <Routes>
        <Route index={true} element={<Home />} />
        <Route path={"add-strings"} element={<AddStrings />} />
        <Route path={"maze"} element={<Maze />} />
      </Routes>
    </main>
  );
}

export default App;
