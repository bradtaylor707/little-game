import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root id element");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
