import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Item } from 'server/entities/item.entity';
import { ItemsService } from 'server/providers/services/items.service';

class ItemsBody {
  name: string;
  quantity: number;
  groceryListId: number;
  isPurchased: boolean;
  krogerId: string;
}

class ItemsBodyWithId {
  id: number;
}

@Controller()
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get('/items') //get all items
  async index() {
    const items = await this.itemsService.findAll();
    return { items };
  }

  @Get('/items/:groceryListid') //get all items from a specific grocery list
  async show(@Param('groceryListId') groceryListid: string) {
    const items = await this.itemsService.findOne(parseInt(groceryListid));
    return { items };
  }

  @Get('/items/:krogerId') //get kroger item equivalent TODO: Hi Anne this is a mess good luck! :)
  async getKrogerItem(@Param('krogerId') krogerId: string) {
    const items = 0; //
    // await this.itemsService.findByKrogerId(krogerId);
    return { items };
  }

  @Post('/items') //create a new item
  async create(@Body() body: ItemsBody) {
    let item = new Item();
    item.name = body.name;
    item.quantity = body.quantity;
    item.groceryListId = body.groceryListId;
    item.isPurchased = body.isPurchased;
    console.log(item);
    item = await this.itemsService.create(item);
    return { item };
  }

  @Put('items/:id') //update an item's name
  async update(@Param('id') id: string, @Body() body: ItemsBodyWithId) {
    let item = await this.itemsService.findOne(body.id);
    item.isPurchased = !item.isPurchased;
    return await this.itemsService.update(item);
  }

  @Delete('items/:id') //delete an item (again, I have no idea if this works)
  async delete(@Param('id') id: string) {
    return await this.itemsService.delete(parseInt(id));
  }
}