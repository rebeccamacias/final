import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroceryList } from 'server/entities/grocery_list.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class GroceryListsService {
  constructor(
    @InjectRepository(GroceryList)
    private readonly groceryListRepository: Repository<GroceryList>,
  ) {}

  findAll(): Promise<GroceryList[]> {
    return this.groceryListRepository.find();
  }

  findOne(id: number): Promise<GroceryList> {
    return this.groceryListRepository.findOne(id);
  }

  async create(groceryList: GroceryList): Promise<GroceryList> {
    return this.groceryListRepository.save(groceryList);
  }

  async update(groceryList: GroceryList): Promise<UpdateResult> {
    return this.groceryListRepository.update(groceryList.id, groceryList);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.groceryListRepository.delete(id);
  }
}