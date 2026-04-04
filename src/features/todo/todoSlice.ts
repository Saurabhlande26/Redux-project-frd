import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodosAPI, addTodoAPI, deleteTodoAPI, updateTodoAPI } from "./todoAPI";

interface Todo {
    id: number;
    title: string;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null
};

// FETCH
export const fetchTodos = createAsyncThunk(
    "todo/fetchTodos",
    async (_, thunkAPI) => {
        try {
            const res = await fetchTodosAPI();
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue("Failed to fetch");
        }
    }
);

// ADD
export const addTodo = createAsyncThunk(
    "todo/addTodo",
    async (data: { title: string }, thunkAPI) => {
        try {
            const res = await addTodoAPI(data);
            return res.data;
        } catch {
            return thunkAPI.rejectWithValue("Add failed");
        }
    }
);

// DELETE
export const deleteTodo = createAsyncThunk(
    "todo/deleteTodo",
    async (id: number, thunkAPI) => {
        try {
            await deleteTodoAPI(id);
            return id;
        } catch {
            return thunkAPI.rejectWithValue("Delete failed");
        }
    }
);
//  Update
export const updateTodo = createAsyncThunk(
    "todo/updateTodo",
    async (
        { id, title }: { id: number; title: string },
        thunkAPI
    ) => {
        try {
            const res = await updateTodoAPI(id, { title });
            return res.data;
        } catch {
            return thunkAPI.rejectWithValue("Update failed");
        }
    }
);

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // ADD
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })

            // DELETE
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(
                    (todo) => todo.id !== action.payload
                );
            })
            // Update
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.todos = state.todos.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo
                );
            });
    }
});

export default todoSlice.reducer;