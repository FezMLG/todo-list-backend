import { Injectable } from '@nestjs/common';
import { NewTodoItemDto } from 'src/dto/NewTodoItem.dto';
import { SetItemStatusDto } from 'src/dto/SetItemStatusDto.dto';
import { ToDoListDB } from './ToDoListDB.class';

let listdb = new ToDoListDB([]);

@Injectable()
export class TodoService {
  getAllItems() {
    return listdb.getAll();
  }

  setItem(newTodoItemDto: NewTodoItemDto) {
    if (listdb.getItem(newTodoItemDto.id)) {
      listdb = listdb.updateItem(newTodoItemDto);
    } else {
      listdb = listdb.saveItem(newTodoItemDto);
    }
    return 201;
  }

  setItemStatus(setItemStatusDto: SetItemStatusDto) {
    listdb = listdb.setItemStatus(setItemStatusDto);
    return 201;
  }
}
