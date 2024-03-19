import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const handleChange = (event) => {
    setNewTodo((prev) => ({
      ...prev,
      body: event.target.value,
    }));
    console.log(newTodo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/todo/",
        newTodo
      );
      setNewTodo({
        body: "",
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="Add Todo"
        className="input input-bordered input-info w-full max-w-xs"
        onChange={handleChange}
        value={newTodo.body}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit(event);
          }
        }}
      />
      <button onClick={handleSubmit} className="btn btn-accent ml-3">
        ADD Todo
      </button>
    </div>
  );
};

export default TodoForm;
