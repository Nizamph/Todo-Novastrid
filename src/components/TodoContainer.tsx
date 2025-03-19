import React, { useEffect, useState } from "react";
import Todos from "./Todos";
import { GET_TODO } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { addTodo, fetchTodos } from "../store/todoSlice";
interface TodoData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
const TodoContainer = () => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const todos = useSelector((store: any) => store.todoStore.todos);
  const [renderTodos, setRenderTodos] = useState<TodoData[]>(todos);
  const [completedTask, setCompletedTask] = useState<TodoData[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("");
  const dispatch = useDispatch();

  console.log("todos from redux", todos);
  useEffect(() => {
    // fetching todos from mock api

    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const todos = await fetch(GET_TODO);
      const data = await todos.json();
      console.log("all todos", data);
      dispatch(fetchTodos(data));
      //   setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTodo = (title: string) => {
    setTodoTitle(title);
  };

  const todoSubmitHandler = () => {
    if (todoTitle.trim() === "") {
      return;
    }
    dispatch(
      addTodo({
        userId: Math.random(),
        id: Math.random(),
        title: todoTitle,
        completed: false,
      })
    );
    setTodoTitle("");
  };

  console.log("render todos", renderTodos);

  const handleRenderCompleteTodos = () => {
    const completedTodos = todos.filter(
      (td: TodoData) => td.completed === true
    );
    setRenderTodos(completedTodos);
    setCurrentTab("completed");
  };

  const handlePendingTodos = () => {
    const completedTodos = todos.filter(
      (td: TodoData) => td.completed === false
    );
    setRenderTodos(completedTodos);
    setCurrentTab("pending");
  };

  return (
    <div className="todo-parent">
      <div className="todo-add">
        <input type="name" onChange={(e) => handleAddTodo(e.target.value)} />
        <button onClick={todoSubmitHandler}>Add</button>
      </div>
      <div className="todo-list-buttons">
        <button
          onClick={() => handleRenderCompleteTodos()}
          className={currentTab == "completed" ? "highlight-btn" : ""}
        >
          Completed Todos
        </button>
        <button
          className={currentTab == "pending" ? "highlight-btn" : ""}
          onClick={() => handlePendingTodos()}
        >
          Pending Todos
        </button>
      </div>

      {/* <div>
        <div>completed</div>
        {todos.filter((td: TodoData) => (
          <Todos title={td.title} userId={td.userId} id={td.id} key={td.id} />
        ))}
      </div> */}
      {renderTodos.length > 0 ? (
        <>
          {renderTodos.map((td: TodoData) => (
            <Todos title={td.title} userId={td.userId} id={td.id} key={td.id} />
          ))}
        </>
      ) : (
        <>
          {todos.map((td: TodoData) => (
            <Todos title={td.title} userId={td.userId} id={td.id} key={td.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default TodoContainer;
