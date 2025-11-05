import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
  const [newTodo, setNewTodo] = useState("");
  const { addTodo } = useTodo();

  const handleAdd = (e) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    const todo = {
      todo: newTodo,
      completed: false,
    };

    addTodo(todo);
    setNewTodo("");
  };

  return (
    <form className="flex" onSubmit={handleAdd}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
