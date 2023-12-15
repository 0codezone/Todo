import Todo from "../models/todoModel.js";

// Create a todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body; // Destructure additional fields if needed
    const newTodo = new Todo({ title, description, completed });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "not created Internal Server Error" });
  }
};

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "not shows alltodos Internal Server Error" });
  }
};

// Get a single todo by ID
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "not shpw todo Internal Server Error" });
  }
};

// Update a todo by ID
export const updateTodoById = async (req, res) => {
  try {
    const { title, description, completed } = req.body; // Destructure additional fields if needed
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "not updated Internal Server Error" });
  }
};

// Delete a todo by ID
export const deleteTodoById = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(deletedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "not delted Internal Server Error" });
  }
};
