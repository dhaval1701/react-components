import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import { Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../slices/first/firstSlice";
import { fetchContent } from "../../../slices/todos/todoSlice";

const ReduxTest = () => {
  const count = useSelector((state) => state.firstSlice.count);
  const dispatch = useDispatch();

  const contents = useSelector((state) => state.todo.contents);
  const isLoading = useSelector((state) => state.todo.isLoading);
  const error = useSelector((state) => state.todo.error);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  if (isLoading) {
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
        <div>
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
        </div>
      </Space>
    </Wrapper>
  );
};

export default ReduxTest;
