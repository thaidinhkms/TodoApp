import { container } from '@/di/Container';
import { Todo } from '@/domain/entities';
import { Result, AppError, toAppError } from '@/utils/Result';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
