import { Todo } from '@/domain/entities';
import { Result } from '@/utils/Result';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '..';
import { fetchTodos, createTodo, editTodo, deleteTodo } from './Thunks';

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
