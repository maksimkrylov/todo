import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("TodoApp", () => {
  test("adds a new todo", () => {
    render(<App />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(screen.getByTestId("todo-text-Test Task")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<App />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Complete" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    const checkbox = screen.getByTestId("todo-checkbox-Complete");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('data-checked'); 
  });

  test("filters active and completed todos", () => {
    render(<App />);
    const input = screen.getByTestId("todo-input");

    fireEvent.change(input, { target: { value: "First" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.change(input, { target: { value: "Second" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const checkbox = screen.getByTestId("todo-checkbox-First");
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByTestId("filter-active"));
    expect(screen.queryByTestId("todo-text-First")).not.toBeInTheDocument();
    expect(screen.getByTestId("todo-text-Second")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("clear-completed"));
    expect(screen.queryByTestId("todo-text-First")).not.toBeInTheDocument();
    expect(screen.getByTestId("todo-text-Second")).toBeInTheDocument();
  });

  test("clears completed todos", () => {
    render(<App />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "To be cleared" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const checkbox = screen.getByTestId("todo-checkbox-To be cleared");
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByTestId("clear-completed"));
    expect(screen.queryByTestId("todo-text-To be cleared")).not.toBeInTheDocument();
  });
});