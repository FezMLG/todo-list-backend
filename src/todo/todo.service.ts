import { Injectable } from '@nestjs/common';
import { NewTodoItemDto } from 'src/dto/NewTodoItem.dto';
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
}
