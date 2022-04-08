import { SetItemStatusDto } from 'src/dto/SetItemStatusDto.dto';
import { TodoItemDto } from '../dto/TodoItem.dto';
import produce from 'immer';

enum Filters {
  finished = 'finished',
  unfinished = 'unfinished',
}

export class ToDoListDB {
  constructor(private readonly list: TodoItemDto[]) {}

  saveItem(item: TodoItemDto) {
    return new ToDoListDB(this.list.concat(item));
  }

  updateItem(item: TodoItemDto) {
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

  //TODO type error on slice (run all todo.service tests to see)

  removeItem(id: string) {
    const index = this.list.findIndex((el) => el.id == id);
    this.list.splice(index, 1);
    return true;
  }

  getItem(id: string) {
    const find = this.list.find((el) => el.id == id);
    return find ? find : false;
  }

  getAll(filter?: Filters) {
    if (filter) {
      if (filter == Filters.finished) {
        return this.list.filter((el) => el.isDone == true);
      } else if (filter == Filters.unfinished) {
        return this.list.filter((el) => el.isDone == false);
      }
    } else {
      return this.list;
    }
  }

  clearList() {
    return new ToDoListDB([]);
  }
}
