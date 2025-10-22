import {
  CreateTodo,
  EditTodo,
  DeleteTodo,
  GetTodos,
} from '@/application/usecases/todo';
import { container } from '@/di/Container';
import { createContext, ReactNode, useContext, useMemo } from 'react';

type TodoUseCasesShape = {
  createTodo: CreateTodo;
  editTodo: EditTodo;
  deleteTodo: DeleteTodo;
  getTodos: GetTodos;
};

const TodoContext = createContext<TodoUseCasesShape | null>(null);
export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('Todo not provided');
  return ctx;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo<TodoUseCasesShape>(
    () => ({
      createTodo: container.resolve('CREATE_TODO'),
      editTodo: container.resolve('EDIT_TODO'),
      deleteTodo: container.resolve('DELETE_TODO'),
      getTodos: container.resolve('GET_TODOS'),
    }),
    [],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
