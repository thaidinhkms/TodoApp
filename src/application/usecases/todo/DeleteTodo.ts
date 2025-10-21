import ITodoRepository from '../../../domain/repositories/ITodoRepository';
import { Todo } from '../../../domain/entities/Todo';

export default class DeleteTodo {
  constructor(private readonly repo: ITodoRepository) {}
  async execute(todo: Todo): Promise<void> {
    return this.repo.remove(todo.id);
  }
}
