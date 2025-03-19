import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, fetchTodos, updateTodo } from "../store/todoSlice";

// todo types
interface TodoData {
  userId: number;
  id: number;
  title: string;
  completed?: boolean;
}

const Todos: React.FC<TodoData> = ({
  userId,
  id,
  title,
  completed = false,
}) => {
  const todos = useSelector((store: any) => store.todoStore.todos);

  const dispatch = useDispatch();
  const handleDeleteTodo = (id: number) => {
    // const todoAfterDelete = todos.filter((todo: TodoData) => todo.id !== id);
    // dispatch(fetchTodos(todoAfterDelete));
    dispatch(deleteTodo(id));
  };

  const handleCompleteTodoHandler = (id: number) => {
    console.log("update todo", id);
    dispatch(updateTodo(id));
  };

  const currentTodo = todos.find((todo: TodoData) => todo.id === id);
  const isCompleted = currentTodo?.completed || false;

  return (
    <div className="todo">
      <h2 className="text">{title}</h2>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => handleCompleteTodoHandler(id)}
      />
      <div>
        <button onClick={() => handleDeleteTodo(id)}>delete</button>
      </div>
    </div>
  );
};

export default Todos;
