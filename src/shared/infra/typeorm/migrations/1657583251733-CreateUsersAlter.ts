import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersAlter1657583251733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isUnique: true,
                        isPrimary:true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name:"password",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "driver_license",
                        type: "varchar"
                    },
                    {
                        name: "isAdmin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
