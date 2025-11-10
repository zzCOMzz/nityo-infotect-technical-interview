import express from "express";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandlers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use("/api", routes);

export default app;
