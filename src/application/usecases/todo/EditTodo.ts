import { Todo } from '@/domain/entities/Todo';
import { ITodoRepository } from '@/domain/repositories/ITodoRepository';

export class EditTodo {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(todo: Todo): Promise<void> {
    return this.repo.update(todo);
  }
}
