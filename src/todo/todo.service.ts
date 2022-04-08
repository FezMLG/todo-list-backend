import { Injectable } from '@nestjs/common';
import { TodoItemDto } from '../dto/NewTodoItem.dto';
import { SetItemStatusDto } from '../dto/SetItemStatusDto.dto';
import { Filters } from '../interfaces/filters.enum';
import { ToDoListDB } from './ToDoListDB.class';

let listdb = new ToDoListDB([]);

@Injectable()
export class TodoService {
  getAllItems(filter?: Filters): TodoItemDto | TodoItemDto[] {
    if (filter) {
      return listdb.getAll(filter);
    } else {
      return listdb.getAll();
    }
  }

  getOneItem(id: string) {
    return listdb.getItem(id);
  }

  setItem(newTodoItemDto: TodoItemDto) {
    if (listdb.getItem(newTodoItemDto.id)) {
      listdb = listdb.updateItem(newTodoItemDto);
    } else {
      listdb = listdb.saveItem(newTodoItemDto);
    }
    return listdb.getItem(newTodoItemDto.id);
  }

  removeItem(id: string): boolean {
    if (listdb.getItem(id)) {
      listdb.removeItem(id);
      return true;
    } else {
      return false;
    }
  }

  setItemStatus(setItemStatusDto: SetItemStatusDto): boolean {
    if (listdb.getItem(setItemStatusDto.id)) {
      listdb = listdb.setItemStatus(setItemStatusDto);
      return true;
    } else {
      return false;
    }
  }
}
