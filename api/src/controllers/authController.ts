import type { NextFunction, Request, Response } from "express";
import { login } from "../services/authServices";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ error: "Email and password are required" });
  try {
    const data = await login({ email, password });
    res.status(201).json({ message: "login successful", data });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "login failed!",
    });
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is required" });
  }
  const token = authHeader.split(" ")[1];
  const isValid = jwt.verify(token, config.JWT_SECRET_KEY);

  if (!isValid) {
    return res.status(401).json({ error: "Invalid token" });
  }
  next();
};
