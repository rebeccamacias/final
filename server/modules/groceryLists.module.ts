import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryListsController } from 'server/controllers/grocery_lists.controller';
import { ItemsController } from 'server/controllers/item.controller';
import { GroceryList } from 'server/entities/grocery_list.entity';
import { Item } from 'server/entities/item.entity';
import { GroceryListsService } from 'server/providers/services/grocery_lists.service';
import { ItemsService } from 'server/providers/services/items.service';
import { JwtService } from 'server/providers/services/jwt.service';
import { GuardUtil } from 'server/providers/util/guard.util';

@Module({
  imports: [TypeOrmModule.forFeature([GroceryList, Item])],
  controllers: [GroceryListsController, ItemsController],
  providers: [GroceryListsService, JwtService, GuardUtil, ItemsService],
  exports: [],
})
export class GroceryListsModule {}