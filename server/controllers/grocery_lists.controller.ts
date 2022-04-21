import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { GroceryList } from 'server/entities/grocery_list.entity';
import { GroceryListsService } from 'server/providers/services/grocery_lists.service';

class GroceryListBody {
  name: string;
}

class GroceryListBodyWithId { //for updating the name of a grocery list
  id: number;
  name: string;
}

@Controller()
export class GroceryListsController {
  constructor(private groceryListsService: GroceryListsService) {}

  @Get('/grocery_lists') //get all grocery lists
  async index() {
    const groceryLists = await this.groceryListsService.findAll();
    return { groceryLists };
  }

  @Get('/grocery_lists/:id') //get all grocery lists from a specific user
  async show(@Param('id') id: string) {
    const groceryList = await this.groceryListsService.findOne(parseInt(id));
    return { groceryList };
  }

  @Post('/grocery_lists') //create a new grocery list
  async create(@JwtBody() jwtBody: JwtBodyDto, @Body() body: GroceryListBody) {
    let groceryList = new GroceryList();
    groceryList.name = body.name;
    groceryList.userId = jwtBody.userId;
    console.log(groceryList);
    groceryList = await this.groceryListsService.create(groceryList);
    return { groceryList };
  }

  @Put('/grocery_lists/:id') //update a grocery list's name
  async update(@Param('id') id: string, @Body() body: GroceryListBodyWithId) {
    let groceryList = await this.groceryListsService.findOne(parseInt(id));
    groceryList.name = body.name;
    return await this.groceryListsService.update(groceryList);
  }

  @Delete('/grocery_lists/:id') //delete a grocery list (i have no idea if this works)
  async delete(@Param('id') id: string) {
    return await this.groceryListsService.delete(parseInt(id));
  }
}