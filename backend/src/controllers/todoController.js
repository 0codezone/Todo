import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";

// Create a todo
export const createTodo = asyncHandler(async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const newTodo = new Todo({ title, description, completed });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Not created: Internal Server Error" });
    throw new Error("Error creating todo");
  }
});

// Get all todos
export const getTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Not show all todos: Internal Server Error" });
  }
});

// Get a single todo by ID
export const getTodoById = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Not show todo: Internal Server Error" });
  }
});

// Update a todo by ID
export const updateTodoById = asyncHandler(async (req, res) => {
  try {
    const { title, description, completed } = req.body; // Destructure additional fields if needed
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Not updated: Internal Server Error" });
  }
});

// Delete a todo by ID
export const deleteTodoById = asyncHandler(async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    res.json(deletedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Not deleted: Internal Server Error" });
  }
});
