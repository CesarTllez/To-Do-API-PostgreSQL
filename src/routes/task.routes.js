import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  deleteById,
} from "../services/task.service.js";

const routerTask = Router();

routerTask.get("/", async (_, res) => {
  const tasks = await getAll();
  res.json(tasks);
});

routerTask.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getById([id]);
  result.task
    ? res.status(result.status).json(result.task)
    : res.status(result.status).end();
});

routerTask.post("/", async (req, res) => {
  const { name, description } = req.body;
  const result = await create([name, description]);
  res.status(result.status).end();
});

routerTask.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const result = await update([id, name, description]);
  res.status(result.status).end();
});

routerTask.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteById([id]);
  res.status(result.status).end();
});

export default routerTask;
