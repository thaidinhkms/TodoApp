import { Todo } from '@/domain/entities/Todo';
import { ITodoRepository } from '@/domain/repositories/ITodoRepository';
import { Result } from '@/utils/Result';

export class GetTodos {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(): Promise<Result<Todo[]>> {
    return this.repo.getAll();
  }
}
