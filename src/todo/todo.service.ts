import { Injectable } from '@nestjs/common';
import { NewTodoItemDto } from 'src/dto/NewTodoItem.dto';
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

  setItem(newTodoItemDto: NewTodoItemDto) {
    if (listdb.getItem(newTodoItemDto.id)) {
      listdb = listdb.updateItem(newTodoItemDto);
    } else {
      listdb = listdb.saveItem(newTodoItemDto);
    }
    return 201;
  }

  removeItem(id: string) {
    listdb.removeItem(id);
    return 200;
  }

  setItemStatus(setItemStatusDto: SetItemStatusDto) {
    listdb = listdb.setItemStatus(setItemStatusDto);
    return 201;
  }
}
