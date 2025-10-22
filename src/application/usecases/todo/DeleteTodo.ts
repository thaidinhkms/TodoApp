import { Todo } from '@/domain/entities';
import { ITodoRepository } from '@/domain/repositories';

export class DeleteTodo {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(todo: Todo): Promise<void> {
    return this.repo.remove(todo.id);
  }
}
