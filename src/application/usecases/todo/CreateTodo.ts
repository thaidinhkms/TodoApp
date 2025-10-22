import { Todo } from '@/domain/entities/Todo';
import { ITodoRepository } from '@/domain/repositories/ITodoRepository';

export class CreateTodo {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(todo: Todo): Promise<void> {
    return this.repo.add(todo);
  }
}
