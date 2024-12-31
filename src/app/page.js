// Main page component for our Next.js application
import React from "react";
import TodoList from "../components/TodoList";

const HomePage = () => {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
};

export default HomePage;