import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'server/entities/item.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findAllForList(id: number): Promise<Item[]> {
    return this.itemRepository.find({groceryListId:id});
  }

  findOne(id: number): Promise<Item> {
    return this.itemRepository.findOne(id);
  }

  create(item: Item): Promise<Item> {
    return this.itemRepository.save(item);
  }

  update(item: Item): Promise<UpdateResult> {
    return this.itemRepository.update(item.id, item);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.itemRepository.delete(id);
  }
}