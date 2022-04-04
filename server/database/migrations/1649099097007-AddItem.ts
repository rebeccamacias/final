import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddItem1649099097007 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'item',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'name',
                        type: 'text',
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                    },
                    {
                        name: 'groceryListId',
                        type: 'int',
                    },
                    {
                        name: 'isPurchased',
                        type: 'boolean',
                    }
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('item');
    }
}
