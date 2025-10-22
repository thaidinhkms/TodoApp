import { Todo } from '@/domain/entities/Todo';
import { ITodoRepository } from '@/domain/repositories/ITodoRepository';

export class GetTodos {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(): Promise<Todo[]> {
    return this.repo.getAll();
  }
}
