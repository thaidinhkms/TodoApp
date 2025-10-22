import { Todo } from '@/domain/entities/Todo';
import { Result } from '@/utils/Result';

export interface ITodoRepository {
  getAll(): Promise<Result<Todo[]>>;
  add(todo: Todo): Promise<Result<void>>;
  update(todo: Todo): Promise<Result<void>>;
  remove(id: string): Promise<Result<void>>;
}
