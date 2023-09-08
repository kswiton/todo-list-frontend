export interface Task {
  id: number;
  content: string;
  done: boolean;
}

const baseUrl = "http://localhost:3005";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${baseUrl}/tasks`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const addTask = async (newTask: {
  content: string;
  done: boolean;
}): Promise<void> => {
  if (!newTask.content.trim()) {
    throw new Error("Task content cannot be empty.");
  }

  await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: "DELETE",
  });
};

export const toggleTask = async (
  taskId: number,
  done: boolean
): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done: !done }),
  });
};
