import { Todo } from '@/domain/entities/Todo';
import { ITodoRepository } from '@/domain/repositories/ITodoRepository';
import { Result } from '@/utils/Result';

export class CreateTodo {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(todo: Todo): Promise<Result<void>> {
    return this.repo.add(todo);
  }
}
