import express from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} from "../controllers/todoController.js";

const router = express.Router();

// Create a todo
router.post("/", createTodo);

// Get all todos
router.get("/", getTodos);

// Get a single todo by ID
router.get("/:id", getTodoById);

// Update a todo by ID
router.put("/:id", updateTodoById);

// Delete a todo by ID
router.delete("/:id", deleteTodoById);

export default router;
