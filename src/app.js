import express from "express";
import cors from "cors";
import routerTask from "./routes/task.routes.js";
import notFound from "./middleware/notFound.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/tasks", routerTask);
app.use(notFound);

export default app;
