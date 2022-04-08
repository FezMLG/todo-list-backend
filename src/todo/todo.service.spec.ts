import { Test, TestingModule } from '@nestjs/testing';
import { Filters } from '../interfaces/filters.enum';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should create item and return true response', () => {
    const sampleItem = {
      id: '1',
      title: 'tt',
      description: 'opis',
      isDone: false,
    };
    const status = service.setItem(sampleItem);
    expect(status).toEqual(sampleItem);
  });

  it('should create item and return array of items', () => {
    const sampleItem1 = {
      id: '1',
      title: 'tt',
      description: 'opis',
      isDone: false,
    };
    const sampleItem2 = {
      id: '2',
      title: 'tt',
      description: 'opis',
      isDone: false,
    };
    service.setItem(sampleItem1);
    service.setItem(sampleItem2);
    const items = service.getAllItems();
    expect(items).toEqual([sampleItem1, sampleItem2]);
  });

  it('should create item and return array of items with filters', () => {
    const sampleItem1 = {
      id: '1',
      title: 'tt',
      description: 'opis',
      isDone: false,
    };
    const sampleItem3 = {
      id: '3',
      title: 'tt',
      description: 'opis',
      isDone: false,
    };
    const sampleItem2 = {
      id: '2',
      title: 'tt',
      description: 'opis',
      isDone: true,
    };
    service.setItem(sampleItem1);
    service.setItem(sampleItem2);
    service.setItem(sampleItem3);
    const items1 = service.getAllItems(Filters.unfinished);
    const items2 = service.getAllItems(Filters.finished);
    expect(items1).toEqual([sampleItem1, sampleItem3]);
    expect(items2).toEqual([sampleItem2]);
  });

  it('should create item and update its description and title', () => {
    const sampleItem1 = {
      id: '1',
      title: 'tt',
      description: 'opis',
      isDone: false,
    };
    const sampleItem2 = {
      id: '1',
      title: 'ttyyyy',
      description: 'opissssss',
      isDone: false,
    };
    service.setItem(sampleItem1);
    const item = service.setItem(sampleItem2);
    expect(item).toEqual(sampleItem2);
  });

  it('should create item, update its status and return it', () => {
    const sampleItem1 = {
      id: '1',
      title: 'tt',
      description: 'opis',
      isDone: false,
    };
    const sampleItemStatus = {
      id: '1',
      isDone: true,
    };
    service.setItem(sampleItem1);
    service.setItemStatus(sampleItemStatus);
    const item = service.getOneItem(sampleItem1.id);
    if (!item) {
      fail('Item does not exist?');
    }
    expect(item.isDone).toEqual(true);
  });

  it('should delete item', () => {
    console.log(service.getAllItems());
    const sampleItem1 = {
      id: '1',
      title: 'tt',
      description: 'opis',
      isDone: false,
    };
    const item = service.setItem(sampleItem1);
    expect(item).toEqual(sampleItem1);
    service.removeItem(sampleItem1.id);
    const notItem = service.getOneItem(sampleItem1.id);
    expect(notItem).toBe(false);
  });
});
