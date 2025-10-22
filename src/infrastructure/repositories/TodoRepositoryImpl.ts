import { Todo } from '@/domain/entities';
import { ITodoRepository } from '@/domain/repositories';
import { TODOS_KEY } from '@/infrastructure/constants/Keys';
import { IStorage } from '@/infrastructure/contracts/IStorage';
import { Result, ok, err } from '@/utils/Result';

export class TodoRepositoryImpl implements ITodoRepository {
  constructor(private readonly storage: IStorage) {}

  async getAll(): Promise<Result<Todo[]>> {
    try {
      const todos = await this.storage.getObject<Todo[]>(TODOS_KEY);
      return ok(todos ?? []);
    } catch (error: any) {
      return err({ message: error?.message ?? 'Failed to get todos' });
    }
  }

  async add(todo: Todo): Promise<Result<void>> {
    const result = await this.getAll();
    if (!result.ok) return result;

    try {
      const todos = result.value ?? [];
      todos.push(todo);
      await this.save(todos);
      return ok();
    } catch (error: any) {
      return err({ message: error?.message ?? 'Failed to add todo' });
    }
  }

  async update(todo: Todo): Promise<Result<void>> {
    const result = await this.getAll();
    if (!result.ok) return result;

    try {
      const todos = result.value ?? [];
      const index = todos.findIndex(t => t.id === todo.id);
      if (index === -1) {
        return err({ message: `Todo with id ${todo.id} not found` });
      }
      todos[index] = todo;
      await this.save(todos);
      return ok();
    } catch (error: any) {
      return err({ message: error?.message ?? 'Failed to update todo' });
    }
  }

  async remove(id: string): Promise<Result<void>> {
    const result = await this.getAll();
    if (!result.ok) return result;

    try {
      const todos = result.value ?? [];
      const updated = todos.filter(t => t.id !== id);
      await this.save(updated);
      return ok();
    } catch (error: any) {
      return err({ message: error?.message ?? 'Failed to remove todo' });
    }
  }

  private async save(todos: Todo[]): Promise<void> {
    await this.storage.setObject(TODOS_KEY, todos);
  }
}
