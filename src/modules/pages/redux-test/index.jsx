import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import { Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../slices/first/firstSlice";
import { addTodo, toggleTodo } from "../../../slices/todos/todoSlice";
import { fetchUsers } from "../../../slices/user/userSlice";

const ReduxTest = () => {
  const count = useSelector((state) => state.firstSlice.count);
  const todos = useSelector((state) => state.todos);

  const { items, status, error } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    dispatch(addTodo(newTodo));
    setNewTodo("");
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === "loading") {
    return "loading...";
  }

  if (error) {
    return error;
  }

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
          {todos.map((todo) => (
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

        <h1>User with API</h1>
        <ul>
          {items.map((user) => (
            <li key={user.id}>
              <div>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>
                  Address: {user.address.street}, {user.address.city},{" "}
                  {user.address.zipcode}
                </p>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
                <p>Company: {user.company.name}</p>
              </div>
            </li>
          ))}
        </ul>

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
    </Wrapper>
  );
};

export default ReduxTest;
