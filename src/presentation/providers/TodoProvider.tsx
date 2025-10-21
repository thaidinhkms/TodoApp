import { container } from '../../common/Container';
import GetTodos from '../../application/usecases/todo/GetTodos';
import CreateTodo from '../../application/usecases/todo/CreateTodo';
import EditTodo from '../../application/usecases/todo/EditTodo';
import DeleteTodo from '../../application/usecases/todo/DeleteTodo';
import { createContext, ReactNode, useContext, useMemo } from 'react';

type TodoUseCasesShape = {
  getTodos: GetTodos;
  createTodo: CreateTodo;
  editTodo: EditTodo;
  deleteTodo: DeleteTodo;
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
      getTodos: container.resolve('GET_TODOS'),
      createTodo: container.resolve('CREATE_TODO'),
      editTodo: container.resolve('EDIT_TODO'),
      deleteTodo: container.resolve('DELETE_TODO'),
    }),
    [],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
