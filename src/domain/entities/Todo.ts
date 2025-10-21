import { v4 as uuidv4 } from 'uuid';

export class Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;

  constructor(title: string) {
    this.id = uuidv4();
    this.title = title;
    this.done = false;
    this.createdAt = new Date().toLocaleString();
  }
}
