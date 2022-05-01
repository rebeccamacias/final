import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from 'server/controllers/item.controller';
import { Item } from 'server/entities/item.entity';
import { User } from 'server/entities/user.entity';
import { ItemsService } from 'server/providers/services/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, User])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [],
})
export class ItemsModule {}