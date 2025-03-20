import { Link } from "react-router";

export default function Home() {
  return (
    <div id={"home"}>
      <ul>
        <li>
          <Link to={"maze"}>Maze game</Link>
        </li>
        <li>
          <Link to={"add-strings"}>Add Strings</Link>
        </li>{" "}
        <li>
          <Link to={"jotai"}>Jotai State Management</Link>
        </li>
      </ul>
    </div>
  );
}
