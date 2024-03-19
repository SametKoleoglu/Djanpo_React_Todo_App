import React, { useState } from "react";
import {
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import axios from "axios";

const Table = ({ todos, setTodos, isLoading }) => {
  const [editText, setEditText] = useState({
    body: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todo/${id}/`);
      const newList = todos.filter((todo) => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, body) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/todo/${id}/`,
        body
      );
      const newTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckBox = async (id, body) => {
    handleEdit(id, {
      completed: !body,
    });
  };

  const handleChange = (event) => {
    setEditText((prev) => ({
      ...prev,
      body: event.target.value,
    }));
  };

  const handleClick = () => {
    handleEdit(editText.id, editText);
    setEditText({
      body: "",
    });
  };

  return (
    <>
      <div className="py-14 flex justify-center">
        <table className="w11/12 max-w-4xl bg-blue-500 m-10 ">
          <thead className="border-b-2 border-black">
            <tr>
              <th className="p-12 text-sm font-semibold tracking-wide text-left">
                Checkbox
              </th>
              <th className="p-12 text-sm font-semibold tracking-wide text-left">
                To Do
              </th>
              <th className="p-12 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="p-12 text-sm font-semibold tracking-wide text-left">
                Data Created
              </th>
              <th className="p-12 text-sm font-semibold tracking-wide text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div>
                <p className="text-center">Loading</p>
              </div>
            ) : (
              todos.map((todo, index) => {
                return (
                  <tr key={index} className="border-b border-black">
                    <td className="p-3" title={todo.id}>
                      <span
                        onClick={() => handleCheckBox(todo.id, todo.completed)}
                        className="inline-block cursor-pointer"
                      >
                        {todo.completed ? (
                          <MdOutlineCheckBox />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank />
                        )}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{todo.body}</td>
                    <td className="p-3 text-sm text-center">
                      {todo.completed ? (
                        <span className="p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-400">
                          Done
                        </span>
                      ) : (
                        <span className="p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-600 text-white">
                          No Completed
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(todo.created).toLocaleString()}
                    </td>
                    <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                      <span className="text-xl inline-block cursor-pointer">
                        <label htmlFor="my_modal" className="btn">
                          <MdEditNote onClick={() => setEditText(todo)} />
                        </label>
                      </span>
                      <span className="text-xl inline-block cursor-pointer">
                        <MdOutlineDeleteOutline
                          onClick={() => handleDelete(todo.id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit TODO</h3>
            <input
              type="text"
              value={editText.body}
              onChange={handleChange}
              className="input input-bordered w-full mt-8"
            />
            <div className="modal-action">
              <label
                htmlFor="my_modal"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Edit
              </label>
              <label htmlFor="my_modal" className="btn">
                Close!
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
