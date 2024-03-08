import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1709670725723 implements MigrationInterface {
    name = 'InitialMigration1709670725723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assessments" ("id" SERIAL NOT NULL, "rating" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "bookId" uuid, CONSTRAINT "PK_a3442bd80a00e9111cefca57f6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(125) NOT NULL, "author" character varying(125) NOT NULL, "description" character varying, "genres" text NOT NULL, "type" character varying(125) NOT NULL, "cover" character varying NOT NULL, "views" integer NOT NULL, "launched_in" character varying(10) NOT NULL, "status" character varying(60) NOT NULL, "isActive" boolean NOT NULL DEFAULT 'true', "userId" uuid, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "text" character varying(240) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "bookId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(150) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "birthday" date NOT NULL, "resetCode" character varying(8), "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_a6aab0d30090866bb9cc0c61c72" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_2291a7610c68f3d2981adbe5015" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_bb8627d137a861e2d5dc8d1eb20" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_fe496134857bf079aa6b55d68df" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_fe496134857bf079aa6b55d68df"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_bb8627d137a861e2d5dc8d1eb20"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_2291a7610c68f3d2981adbe5015"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_a6aab0d30090866bb9cc0c61c72"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "assessments"`);
    }

}
