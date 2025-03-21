import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Todos2 from "./todos-2";

describe("Todos2", () => {
  test("types in the input", () => {
    render(<Todos2 />);

    const el = screen.getByLabelText("Create A Task");

    fireEvent.change(el, { target: { value: "Task1" } });

    expect((el as HTMLInputElement).value).toBe("Task1");
  });

  test("end to end", () => {
    render(<Todos2 />);

    const input = screen.getByLabelText("Create A Task") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Task1" } });

    expect(input.value).toBe("Task1");

    const button = screen.getByRole("button", { name: "Submit" }) as HTMLButtonElement;

    fireEvent.click(button);

    expect(input.value).toBe("");

    const title = screen.getByText("Task1");

    expect(title).toBeDefined();

    const completionStatus = screen.getByText("Incomplete");

    expect(completionStatus).toBeDefined();

    const checkboxLabel = screen.getByLabelText("Task Done");

    fireEvent.click(checkboxLabel);

    expect(completionStatus.textContent).not.toEqual("Incomplete");

    const incompleteRadioFilter = screen.getByLabelText("incomplete");

    fireEvent.click(incompleteRadioFilter);

    expect(() => screen.getByText("Task1")).toThrow();

    const completeRadioFilter = screen.getByLabelText("complete");

    fireEvent.click(completeRadioFilter);

    expect(() => screen.getByText("Task1")).not.toThrow();
  });
});
