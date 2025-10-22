import { Todo } from '@/domain/entities';
import { ITodoRepository } from '@/domain/repositories';
import { Result } from '@/utils/Result';

export class DeleteTodo {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(todo: Todo): Promise<Result<void>> {
    return this.repo.remove(todo.id);
  }
}
