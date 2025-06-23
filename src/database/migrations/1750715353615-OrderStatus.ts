import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderStatus1750715353615 implements MigrationInterface {
  name = 'OrderStatus1750715353615';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order_status"`);
  }
}
