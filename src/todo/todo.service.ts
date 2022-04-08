import { Injectable } from '@nestjs/common';
import { TodoItemDto } from 'src/dto/NewTodoItem.dto';
import { SetItemStatusDto } from 'src/dto/SetItemStatusDto.dto';
import { ToDoListDB } from './ToDoListDB.class';

let listdb = new ToDoListDB([]);
enum Filters {
  finished = 'finished',
  unfinished = 'unfinished',
}

@Injectable()
export class TodoService {
  getAllItems(filter?: Filters) {
    if (filter) {
      return listdb.getAll(filter);
    } else {
      return listdb.getAll();
    }
  }

  setItem(newTodoItemDto: TodoItemDto) {
    if (listdb.getItem(newTodoItemDto.id)) {
      listdb = listdb.updateItem(newTodoItemDto);
    } else {
      listdb = listdb.saveItem(newTodoItemDto);
    }
    return true;
  }

  removeItem(id: string) {
    listdb.removeItem(id);
    return true;
  }

  setItemStatus(setItemStatusDto: SetItemStatusDto) {
    listdb = listdb.setItemStatus(setItemStatusDto);
    return true;
  }
}
