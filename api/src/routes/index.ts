import { Router } from "express";
import todosRouter from "./todos";
import authRouter from "./auth";

const router = Router();

router.use("/todos", todosRouter);
router.use("/", authRouter);

export default router;
