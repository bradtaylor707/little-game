import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./app";

describe("App", () => {
  test("does something", () => {
    render(<App />);

    const el = screen.getByRole("link", { name: "Future Message" });

    fireEvent.click(el);

    expect(window.location.pathname).toBe("/jotai");
  });
});
