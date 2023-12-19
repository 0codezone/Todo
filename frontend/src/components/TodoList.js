import React from "react";
import TodoItem from "./TodoItem";
import "./todoList.css";

const TodoList = ({ todos, completeTodo, deleteTodo }) => {
  return (
    <div className="todoList">
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
