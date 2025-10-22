import { Todo } from '@/domain/entities/Todo';

export interface ITodoRepository {
  getAll(): Promise<Todo[]>;
  add(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  remove(id: string): Promise<void>;
}
