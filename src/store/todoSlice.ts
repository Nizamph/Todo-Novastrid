import { createSlice } from "@reduxjs/toolkit";

interface TodoContainer {
  todos: TodoData[];
  completedTodos: TodoData[];
}
interface TodoData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const InitialStates: TodoContainer = {
  todos: [],
  completedTodos: [],
};
const todoSlice = createSlice({
  name: "todos",
  initialState: InitialStates,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      console.log("action payload", state.todos);
    },
    updateTodo: (state, action) => {
      state.todos.forEach((todo) => {
        if (action.payload === todo.id) {
          todo.completed = !todo.completed;
        }
      });
    },
    deleteTodo: (state, action) => {
      console.log("delete id", action.payload);
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      console.log("todo after delete", state.todos);
    },
    fetchTodos: (state, action) => {
      state.todos = action.payload;
      state.todos = state.todos.filter((todo) => todo.completed === false);
    },
    toggleTodo: (state, action) => {},
  },
});

export const { addTodo, updateTodo, deleteTodo, fetchTodos, toggleTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
