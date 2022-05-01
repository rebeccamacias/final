import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroceryList } from 'server/entities/grocery_list.entity';
import { User } from "server/entities/user.entity";
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class GroceryListsService {
  constructor(
    @InjectRepository(GroceryList)
        private groceryListRepository: Repository<GroceryList>, 
        @InjectRepository(User)
        private userRepository: Repository<User>, 
    ) {}

  findAll(): Promise<GroceryList[]> {
    return this.groceryListRepository.find();
  }

  getListById(id: number): Promise<GroceryList> {
    return this.groceryListRepository.findOne(id, {
        relations: ['users'],
    })
  }

  async findAllForUser(userId: number): Promise<GroceryList[]> {
    return (await this.userRepository.findOne(userId, {
        relations: ['groceryList'],
    })).groceryLists
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