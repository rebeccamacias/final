import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddUserToList1651363941901 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_grocery_list',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            type: 'int',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'groceryListId',
            type: 'int',
          }
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'user_grocery_list',
      new TableForeignKey({
        columnNames: ['groceryListId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groceryList',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_grocery_list',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_grocery_list');
  }
}
