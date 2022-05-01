import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';

@Entity()
export class GroceryList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @OneToMany(()=> Item, (item) => item.groceryListId)
  item: Item[];

  @ManyToOne (() => User, (user) => user.groceryLists, { cascade: true })
  users: User[];
}