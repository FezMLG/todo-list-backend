import { SetItemStatusDto } from 'src/dto/SetItemStatusDto.dto';
import { NewTodoItemDto } from '../dto/NewTodoItem.dto';
import produce from 'immer';

export class ToDoListDB {
  constructor(private readonly list: NewTodoItemDto[]) {}

  saveItem(item: NewTodoItemDto) {
    return new ToDoListDB(this.list.concat(item));
  }

  updateItem(item: NewTodoItemDto) {
    const nextState = produce(this.list, (draft) => {
      const index = this.list.findIndex((el) => el.id == item.id);
      draft[index] = item;
    });
    return new ToDoListDB(nextState);
  }

  setItemStatus(status: SetItemStatusDto) {
    const nextState = produce(this.list, (draft) => {
      const index = this.list.findIndex((el) => el.id == status.id);
      draft[index].isDone = true;
    });
    return new ToDoListDB(nextState);
  }

  removeItem(id: string) {
    const index = this.list.findIndex((el) => el.id == id);
    this.list.splice(index);
    return true;
  }

  getItem(id: string) {
    const find = this.list.find((el) => el.id == id);
    return find ? find : false;
  }

  getAll() {
    return this.list;
  }

  clearList() {
    return new ToDoListDB([]);
  }
}
