import { NewTodoItemDto } from '../dto/NewTodoItem.dto';

export class ToDoListDB {
  constructor(private readonly list: NewTodoItemDto[]) {}

  saveItem(item: NewTodoItemDto) {
    return new ToDoListDB(this.list.concat(item));
  }

  getAll() {
    return new ToDoListDB(this.list);
  }

  clearList() {
    return new ToDoListDB([]);
  }
}
