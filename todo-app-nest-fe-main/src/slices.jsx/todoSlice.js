import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";


export const createToDo = createAsyncThunk(
  "todo/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateToDo = createAsyncThunk(
  "todo/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getToDos = createAsyncThunk(
  "todo/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("");
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteToDo = createAsyncThunk(
  "todo/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = api.delete(`${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    clearState: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToDos.pending, (state) => {})
      .addCase(getToDos.fulfilled, (state, action) => {
        state.todos = action.payload.data;
      });
  },
});


export const { clearState } = todoSlice.actions;

export default todoSlice.reducer;
