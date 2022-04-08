import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { TodoItemDto } from 'src/dto/NewTodoItem.dto';
import { SetItemStatusDto } from 'src/dto/SetItemStatusDto.dto';
import { IResponse } from 'src/interfaces/response.interface';
import { IItem } from 'src/interfaces/todo.interface';
import { TodoService } from './todo.service';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('set-item')
  async setItem(
    @Body() newTodoItemDto: TodoItemDto,
    @I18n() i18n: I18nContext,
  ): Promise<IResponse> {
    const response = this.todoService.setItem(newTodoItemDto);
    if (response) {
      return await {
        statusCode: 200,
        message: i18n.t('events.CREATE_ITEM_SUCCESS'),
      };
    } else {
      throw new HttpException(
        await i18n.t('events.SERVER_ERROR'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('remove-item')
  async removeItem(
    @Query('itemId') itemId,
    @I18n() i18n: I18nContext,
  ): Promise<IResponse> {
    this.todoService.removeItem(itemId);
    return await {
      statusCode: 200,
      message: i18n.t('events.DELETE_ITEM_SUCCESS'),
    };
  }

  @Get('get-all')
  getAllItems(@Query('filter') filter): IItem | IItem[] {
    return this.todoService.getAllItems(filter);
  }

  @Post('set-status')
  setItemStatus(@Body() setItemStatusDto: SetItemStatusDto) {
    return this.todoService.setItemStatus(setItemStatusDto);
  }
}
