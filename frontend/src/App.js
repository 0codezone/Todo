// App.js
import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import axios from "axios";

const API_URL = "https://todo-zcdv.onrender.com/api";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch initial data from the backend when the component mounts
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post(`${API_URL}/todos`, todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const completeTodo = async (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;

    try {
      await axios.put(`${API_URL}/todos/${updatedTodos[index]._id}`, {
        isCompleted: updatedTodos[index].isCompleted,
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (index) => {
    const todoToDelete = todos[index];

    try {
      await axios.delete(`${API_URL}/todos/${todoToDelete._id}`);
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>TODOS</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
