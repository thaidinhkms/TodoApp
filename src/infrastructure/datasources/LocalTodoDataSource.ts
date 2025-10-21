import { Todo } from '../../domain/entities/Todo';
import { TODOS_KEY } from '../constants/Keys';
import IStorage from '../contracts/IStorage';
import ITodoDataSource from '../contracts/ITodoDataSource';

export class LocalTodoDataSource implements ITodoDataSource {
  constructor(private readonly storage: IStorage) {}

  async getAll(): Promise<Todo[]> {
    const todos = await this.storage.getObject<Todo[]>(TODOS_KEY);
    return todos?.length ? todos : [];
  }
  async getById(id: string) {
    return (await this.getAll()).find(t => t.id === id) ?? null;
  }
  async add(todo: Todo) {
    const all = await this.getAll();
    console.log(all);
    all.unshift(todo);
    this.storage.setObject<Todo[]>(TODOS_KEY, all);
  }
  async update(todo: Todo) {
    const all = await this.getAll();
    const idx = all.findIndex(t => t.id === todo.id);
    if (idx >= 0) {
      all[idx] = todo;
      this.storage.setObject<Todo[]>(TODOS_KEY, all);
    }
  }
  async remove(id: string) {
    const all = (await this.getAll()).filter(t => t.id !== id);
    this.storage.setObject<Todo[]>(TODOS_KEY, all);
  }
}
