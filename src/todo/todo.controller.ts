import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewTodoItemDto } from 'src/dto/NewTodoItem.dto';
import { SetItemStatusDto } from 'src/dto/SetItemStatusDto.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('set-item')
  setItem(@Body() newTodoItemDto: NewTodoItemDto) {
    const response = this.todoService.setItem(newTodoItemDto);
    if (response) {
      return {
        statusCode: 200,
        message: 'created item',
      };
    } else {
      return {
        statusCode: 200,
        message: 'error occurred',
      };
    }
  }

  @Get('get-all')
  getAllItems() {
    return this.todoService.getAllItems();
  }

  @Post('set-status')
  setItemStatus(@Body() setItemStatusDto: SetItemStatusDto) {
    return this.todoService.setItemStatus(setItemStatusDto);
  }
}
