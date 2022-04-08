import { SetItemStatusDto } from 'src/dto/SetItemStatusDto.dto';
import { NewTodoItemDto } from '../dto/NewTodoItem.dto';
import produce from 'immer';

export class ToDoListDB {
  constructor(private readonly list: NewTodoItemDto[]) {}

  saveItem(item: NewTodoItemDto) {
    return new ToDoListDB(this.list.concat(item));
  }

  setItemStatus(status: SetItemStatusDto) {
    const nextState = produce(this.list, (draft) => {
      const index = this.list.findIndex((el) => el.id == status.id);
      draft[index].isDone = true;
    });
    return new ToDoListDB(nextState);
  }

  getAll() {
    return this.list;
  }

  clearList() {
    return new ToDoListDB([]);
  }
}
