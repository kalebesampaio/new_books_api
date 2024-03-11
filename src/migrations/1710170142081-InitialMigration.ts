import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1710170142081 implements MigrationInterface {
    name = 'InitialMigration1710170142081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "isActive" SET DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthday" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthday" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

}
