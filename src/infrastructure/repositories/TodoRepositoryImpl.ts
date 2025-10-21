import ITodoRepository from '../../domain/repositories/ITodoRepository';
import ITodoDataSource from '../../infrastructure/contracts/ITodoDataSource';
import { Todo } from '../../domain/entities/Todo';

export class TodoRepositoryImpl implements ITodoRepository {
  constructor(private readonly dataSource: ITodoDataSource) {}

  async getAll() {
    return this.dataSource.getAll();
  }
  async add(todo: Todo) {
    await this.dataSource.add(todo);
  }
  async update(todo: Todo) {
    await this.dataSource.update(todo);
  }
  async remove(id: string) {
    await this.dataSource.remove(id);
  }
}
