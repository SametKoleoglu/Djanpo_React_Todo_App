import React, { useEffect, useState } from "react";
import "./App.css";
import { Table, TodoForm } from "./components";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/todo/");
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(todos);
  }, []);

  return (
    <div className="bg-slate-400/55 px-8 min-h-screen flex-1">
      <nav className="pt-8">
        <h1 className="text-3xl font-bold pb-8 text-green-400 text-center">
          TODO APP
        </h1>
      </nav>
      <TodoForm setTodos={setTodos} fetchData={fetchData} />
      <Table todos={todos} setTodos={setTodos} isLoading={isLoading} />
    </div>
  );
};

export default App;
