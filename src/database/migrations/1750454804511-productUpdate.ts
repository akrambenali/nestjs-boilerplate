import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductUpdate1750454804511 implements MigrationInterface {
  name = 'ProductUpdate1750454804511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "isActive" TO "statusId"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "statusId" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_9ec2c7792817b56a3533ca1d7aa" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_9ec2c7792817b56a3533ca1d7aa"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "statusId"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "statusId" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "statusId" TO "isActive"`,
    );
  }
}
