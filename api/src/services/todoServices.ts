import { Todo, todos } from "../models/todos";

const getAllTodos = async (): Promise<Todo[]> => {
  return todos;
};

const createTodo = async (todoData: Partial<Todo>): Promise<Todo> => {
  const newTodo: Todo = {
    id: (todos.length + 1).toString(),
    title: todoData.title || "Untitled",
    completed: todoData.completed || false,
  };
  todos.push(newTodo);
  return newTodo;
};

const updateTodo = async (
  id: string,
  todoData: Partial<Todo>
): Promise<Todo[] | null> => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return null;
  }
  todos[todoIndex] = { ...todos[todoIndex], ...todoData };
  return todos;
};

const deleteTodo = async (id: string): Promise<Todo[]> => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

export default { getAllTodos, createTodo, updateTodo, deleteTodo };
