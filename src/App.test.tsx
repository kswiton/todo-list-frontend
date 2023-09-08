import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchTasks, addTask, deleteTask, toggleTask } from "./api";
import "@testing-library/jest-dom";

jest.mock("./api");

const mockedFetchTasks = fetchTasks as jest.MockedFunction<typeof fetchTasks>;
const mockedAddTask = addTask as jest.MockedFunction<typeof addTask>;
const mockedDeleteTask = deleteTask as jest.MockedFunction<typeof deleteTask>;
const mockedToggleTask = toggleTask as jest.MockedFunction<typeof toggleTask>;

describe("<App />", () => {
  beforeEach(() => {
    mockedFetchTasks.mockResolvedValue([
      { id: 1, content: "Sample Task", done: false },
    ]);
  });

  it("renders tasks from API", async () => {
    render(<App />);
    const taskElement = await screen.findByText("Sample Task");
    expect(taskElement).toBeInTheDocument();
  });

  it("adds a new task", async () => {
    mockedAddTask.mockResolvedValueOnce(void 0);

    render(<App />);
    const input = screen.getByPlaceholderText("Add a new task");
    const button = screen.getByLabelText("add-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAddTask).toHaveBeenCalledWith({
        content: "New Task",
        done: false,
      });
    });
  });

  it("deletes a task", async () => {
    mockedDeleteTask.mockResolvedValueOnce(void 0);

    render(<App />);
    const deleteButton = await screen.findByLabelText("delete-button1");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedDeleteTask).toHaveBeenCalledWith(1);
    });
  });

  it("toggles task completion", async () => {
    mockedToggleTask.mockResolvedValueOnce(void 0);

    render(<App />);
    const checkbox = await screen.findByLabelText("toggle-button1");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockedToggleTask).toHaveBeenCalledWith(1, false);
    });
  });
});
