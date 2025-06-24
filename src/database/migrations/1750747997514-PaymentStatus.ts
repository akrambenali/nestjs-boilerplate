import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentStatus1750747997514 implements MigrationInterface {
  name = 'PaymentStatus1750747997514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" RENAME COLUMN "status" TO "statusId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b59e2e874b077ea7acf724e4711" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "statusId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc" FOREIGN KEY ("statusId") REFERENCES "order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_3b6667bfe775fa39753ca6af2dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "statusId" SET NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "payment_status"`);
    await queryRunner.query(
      `ALTER TABLE "order" RENAME COLUMN "statusId" TO "status"`,
    );
  }
}
