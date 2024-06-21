import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const createUserData = createAsyncThunk(
  "user/createUserData",
  async (user) => {
    const response = await axios.post(API_URL, user);
    return response.data;
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (user) => {
    console.log(user?.id, "user?.id");
    const { id, ...rest } = user;
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  }
);

export const deleteUserData = createAsyncThunk(
  "user/deleteUserData",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);
