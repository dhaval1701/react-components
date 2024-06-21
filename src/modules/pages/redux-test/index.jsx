import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import { Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../slices/first/firstSlice";
import { addTodo, toggleTodo } from "../../../slices/todos/todoSlice";

const ReduxTest = ({
  user,
  fetchUserData,
  createUserData,
  updateUserData,
  deleteUserData,
  clearUserData,
}) => {
  // const { items, status, error } = useSelector((state) => state.users);
  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "" });

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (!user.loading && user.data.length) {
      setUsers([...user.data]);
      clearUserData();
    }
  }, [user]);

  const handleCreateUser = () => {
    createUserData(newUser);
    setNewUser({ name: "", username: "", email: "" });
  };

  const handleUpdateUser = (user) => {
    const body = {
      id: user.id,
      ...newUser,
    };
    updateUserData(body);
  };

  const handleDeleteUser = (id) => {
    deleteUserData(id);
  };

  if (user.loading) {
    return "loading...";
  }

  if (user.error) {
    return `Error: ${user.error}`;
  }

  const handleAddTodo = () => {
    dispatch(addTodo(newTodo));
    setNewTodo("");
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  console.log(users, "user.data");

  return (
    <Wrapper>
      <Space
        direction="vertical"
        size="middle"
        style={{
          width: "100%",
        }}
      >
        <h1>Todos</h1>
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id} onClick={() => handleToggleTodo(todo.id)}>
              {todo.completed ? <del>{todo.text}</del> : todo.text}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>

        {/* <div>
          <h1>Counter</h1>
          <p>Count: {count}</p>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>

        <div className="d-flex justify-content-around">
          {contents.slice(1, 10).map((content) => (
            <div key={content.id}>
              <img
                src={`${content.thumbnailUrl}`}
                alt={`${content.title}`}
                className="w-full h-full rounded"
              />
            </div>
          ))}
        </div> */}
      </Space>
      <Space
        direction="vertical"
        size="middle"
        style={{
          width: "100%",
        }}
      >
        <h1>Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <button onClick={() => handleUpdateUser(user)}>Update</button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleCreateUser}>Add User</button>
      </Space>
    </Wrapper>
  );
};

export default ReduxTest;
