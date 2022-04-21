import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryListsController } from 'server/controllers/grocery_lists.controller';
import { GroceryList } from 'server/entities/grocery_list.entity';
import { GroceryListsService } from 'server/providers/services/grocery_lists.service';
import { JwtService } from 'server/providers/services/jwt.service';
import { GuardUtil } from 'server/providers/util/guard.util';

@Module({
  imports: [TypeOrmModule.forFeature([GroceryList])],
  controllers: [GroceryListsController],
  providers: [GroceryListsService, JwtService, GuardUtil],
  exports: [],
})
export class GroceryListsModule {}