import { type Request, type Response } from "express";
import todosServices from "../services/todoServices";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await todosServices.getAllTodos();
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  const newTodo = { title, completed };
  const createdTodo = await todosServices.createTodo(newTodo);
  res.status(201).json(createdTodo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const updatedTodo = await todosServices.updateTodo(id, { title, completed });
  res.json(updatedTodo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const remainingTodos = await todosServices.deleteTodo(id);
  res.json(remainingTodos);
};
