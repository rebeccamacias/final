import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';

@Entity("groceryList")
export class GroceryList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @ManyToOne(()=> User, (user) => user.groceryLists)
  user: User;


  @OneToMany(()=> Item, (item) => item.groceryListId)
  item: Item[];
}