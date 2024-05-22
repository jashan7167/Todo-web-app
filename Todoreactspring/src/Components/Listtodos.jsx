import React, { useEffect, useState } from "react";
import { deleteTodosForUser, retrieveTodos } from "../api/Todoapiservice";
import { useAuth } from "../Authentication/Auth";
import { Link, useNavigate } from "react-router-dom";

function Listtodos() {
  const navigate = useNavigate();
  const context = useAuth();
  function deleteTodo(id) {
    deleteTodosForUser(context.username, id)
      .then(() => {
        setMessage(`Delete of todos with ${id} has been done`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }
  function updateTodo(id) {
    console.log("button clicked");
  }

  function addNewTodo() {
    navigate("/update/-1");
  }

  const today = new Date();

  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDate()
  );
  const [todos, setTodos] = useState([]);
  useEffect(() => refreshTodos, []);

  const [message, setMessage] = useState(null);

  function refreshTodos() {
    retrieveTodos(context.username)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <h1>Things you want to do</h1>
      <div>{message && <p className="alert alert-warning">{message}</p>}</div>
      <div className="todos">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>IsDone</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/update/${todo.id}`}>
                    {" "}
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        updateTodo(todo.id);
                      }}
                    >
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  );
}

export default Listtodos;
