import { Todo } from '@/domain/entities';
import { ITodoRepository } from '@/domain/repositories';
import { TODOS_KEY } from '@/infrastructure/constants/Keys';
import { IStorage } from '@/infrastructure/contracts/IStorage';

export class TodoRepositoryImpl implements ITodoRepository {
  constructor(private readonly storage: IStorage) {}

  async getAll(): Promise<Todo[]> {
    const todos = await this.storage.getObject<Todo[]>(TODOS_KEY);
    return todos ?? [];
  }

  async add(todo: Todo): Promise<void> {
    const todos = await this.getAll();
    todos.push(todo);
    await this.save(todos);
  }

  async update(todo: Todo): Promise<void> {
    const todos = await this.getAll();
    const index = todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      todos[index] = todo;
      await this.save(todos);
    }
  }

  async remove(id: string): Promise<void> {
    const todos = await this.getAll();
    const updated = todos.filter(t => t.id !== id);
    await this.save(updated);
  }

  private async save(todos: Todo[]): Promise<void> {
    await this.storage.setObject(TODOS_KEY, todos);
  }
}
