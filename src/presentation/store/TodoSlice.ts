import { container } from '@/di/Container';
import type { Todo } from '@/domain/entities/Todo';
import { Result, toAppError } from '@/utils/Result';
import type { AppError } from '@/utils/Result';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface TodoState {
  data: Todo[];
  loading: boolean;
  error?: AppError | null;
}

const initialState: TodoState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<
  Result<Todo[]>,
  void,
  { rejectValue: AppError }
>('todo/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const uc = container.resolve('GET_TODOS');
    const result: Result<Todo[]> = await uc.execute();
    return result;
  } catch (err) {
    return rejectWithValue(toAppError(err));
  }
});

export const createTodo = createAsyncThunk<
  Result<void>,
  { todo: Todo },
  { rejectValue: AppError }
>('todo/createTodo', async ({ todo }, { rejectWithValue }) => {
  try {
    const uc = container.resolve('CREATE_TODO');
    const result: Result<void> = await uc.execute(todo);
    return result;
  } catch (err) {
    return rejectWithValue(toAppError(err));
  }
});

export const editTodo = createAsyncThunk<
  Result<void>,
  { todo: Todo },
  { rejectValue: AppError }
>('todo/editTodo', async ({ todo }, { rejectWithValue }) => {
  try {
    const uc = container.resolve('EDIT_TODO');
    const result: Result<void> = await uc.execute(todo);
    return result;
  } catch (err) {
    return rejectWithValue(toAppError(err));
  }
});

export const deleteTodo = createAsyncThunk<
  Result<void>,
  { todo: Todo },
  { rejectValue: AppError }
>('todo/deleteTodo', async ({ todo }, { rejectWithValue }) => {
  try {
    const uc = container.resolve('DELETE_TODO');
    const result: Result<void> = await uc.execute(todo);
    return result;
  } catch (err) {
    return rejectWithValue(toAppError(err));
  }
});

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

export const useTodo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.todo.data);
  const loading = useSelector((state: RootState) => state.todo.loading);
  const error = useSelector((state: RootState) => state.todo.error);

  const fetch = useCallback(async () => {
    const action = await dispatch(fetchTodos());
    if (fetchTodos.fulfilled.match(action)) {
      return action.payload;
    }
    return {
      ok: false,
      error: action.payload ?? { message: 'Unexpected error' },
    } as Result<Todo[]>;
  }, [dispatch]);

  const create = useCallback(
    async (todo: Todo) => {
      const action = await dispatch(createTodo({ todo }));
      if (createTodo.fulfilled.match(action)) {
        const result = action.payload;
        if (result.ok) await dispatch(fetchTodos());
        return result;
      }
      return {
        ok: false,
        error: action.payload ?? { message: 'Unexpected error' },
      } as Result<void>;
    },
    [dispatch],
  );

  const edit = useCallback(
    async (todo: Todo) => {
      const action = await dispatch(editTodo({ todo }));
      if (editTodo.fulfilled.match(action)) {
        const result = action.payload;
        if (result.ok) await dispatch(fetchTodos());
        return result;
      }
      return {
        ok: false,
        error: action.payload ?? { message: 'Unexpected error' },
      } as Result<void>;
    },
    [dispatch],
  );

  const remove = useCallback(
    async (todo: Todo) => {
      const action = await dispatch(deleteTodo({ todo }));
      if (deleteTodo.fulfilled.match(action)) {
        const result = action.payload;
        if (result.ok) await dispatch(fetchTodos());
        return result;
      }
      return {
        ok: false,
        error: action.payload ?? { message: 'Unexpected error' },
      } as Result<void>;
    },
    [dispatch],
  );

  return {
    data,
    loading,
    error,
    fetch,
    create,
    edit,
    remove,
  };
};
