import ITodoRepository from '../../../domain/repositories/ITodoRepository';
import { Todo } from '../../../domain/entities/Todo';

export default class GetTodos {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(): Promise<Todo[]> {
    return this.repo.getAll();
  }
}
