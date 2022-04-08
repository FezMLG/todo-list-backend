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
  createItem(newTodoItemDto: NewTodoItemDto) {
    listdb = listdb.saveItem(newTodoItemDto);
    return 201;
  }

  setitemStatus(setItemStatusDto: SetItemStatusDto) {
    listdb = listdb.setItemStatus(setItemStatusDto);
    return 201;
  }
}
