import ITodoRepository from '../../../domain/repositories/ITodoRepository';
import { Todo } from '../../../domain/entities/Todo';

export default class CreateTodo {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(todo: Todo): Promise<void> {
    return this.repo.add(todo);
  }
}
