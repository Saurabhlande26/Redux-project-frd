import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTodos,
    addTodo,
    deleteTodo
} from "../features/todo/todoSlice";

export default function TodoPage() {
    const dispatch = useDispatch();
    const { todos, loading, error } = useSelector((state: any) => state.todo);

    const [title, setTitle] = useState("");

    useEffect(() => {
        dispatch(fetchTodos() as any);
    }, []);

    const handleAdd = () => {
        if (!title) return;
        dispatch(addTodo({ title }) as any);
        setTitle("");
    };

    return (
        <div>
            <h2>Todo App</h2>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter todo"
            />
            <button onClick={handleAdd}>Add</button>

            <ul>
                {todos.map((todo: any) => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => dispatch(deleteTodo(todo.id) as any)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}