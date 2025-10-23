import type { Todo } from '@/domain/entities/Todo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTodos, createTodo, editTodo, deleteTodo } from './Thunks';
import { TodoState } from './Type';

const initialState: TodoState = {
  data: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.data = action.payload;
    },
    clearTodoError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    const pending = (state: TodoState) => {
      state.loading = true;
      state.error = null;
    };

    // fetchTodos
    builder.addCase(fetchTodos.pending, pending);
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.ok) {
        state.data = action.payload.value ?? [];
      } else {
        state.error = action.payload.error ?? { message: 'Fetch todos failed' };
      }
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? { message: 'Fetch todos error' };
    });

    // createTodo
    builder.addCase(createTodo.pending, pending);
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload.ok) {
        state.error = action.payload.error ?? { message: 'Create todo failed' };
      }
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? { message: 'Create todo error' };
    });

    // editTodo
    builder.addCase(editTodo.pending, pending);
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload.ok) {
        state.error = action.payload.error ?? { message: 'Edit todo failed' };
      }
    });
    builder.addCase(editTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? { message: 'Edit todo error' };
    });

    // deleteTodo
    builder.addCase(deleteTodo.pending, pending);
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload.ok) {
        state.error = action.payload.error ?? { message: 'Delete todo failed' };
      }
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? { message: 'Delete todo error' };
    });
  },
});

export const { setTodos, clearTodoError } = todoSlice.actions;
export default todoSlice.reducer;
