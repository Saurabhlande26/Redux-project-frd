import { useState } from "react";
import { addTodoAPI } from "../features/todo/todoAPI";

const AddTodo = () => {
    const [title, setTitle] = useState("")

    const handleTitle = ({ target }: string) => {
        setTitle(target?.value)
    }

    const submit = async () => {
        await addTodoAPI({ title })
    }

    return (
        <div>
            <input type="text" onChange={(e) => handleTitle(e)} value={title} />
            <button onClick={submit}>Add</button>
        </div>
    )
}

export default AddTodo;