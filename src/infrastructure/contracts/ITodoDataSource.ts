import { Todo } from '../../domain/entities/Todo';

export default interface ITodoDataSource {
  getAll(): Promise<Todo[]>;
  getById(id: string): Promise<Todo | null>;
  add(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  remove(id: string): Promise<void>;
}
