import { Link } from "react-router";

export default function Home() {
  return (
    <div id={"home"}>
      <ul>
        <li>
          <Link to={"todos"}>TODOS!!!!</Link>
        </li>
        <li>
          <Link to={"maze"}>Maze game</Link>
        </li>
        <li>
          <Link to={"add-strings"}>Add Strings</Link>
        </li>
        <li>
          <Link to={"jotai"}>Future Message</Link>
        </li>
      </ul>
    </div>
  );
}
