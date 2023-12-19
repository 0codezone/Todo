import React from "react";
import "./todoItem.css";

const TodoItem = ({ index, todo, completeTodo, deleteTodo }) => {
  const handleCompleteToggle = () => {
    completeTodo(index, !todo.isCompleted);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      deleteTodo(index);
    }
  };

  return (
    <li>
      <span
        style={{
          textDecoration: todo.isCompleted ? "line-through" : "none",
        }}
      >
        <p>{todo.title}</p> {todo.description}
      </span>
      <div className="btn-div">
        <button onClick={handleCompleteToggle}>
          {todo.isCompleted ? "Uncomplete" : "Complete"}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
