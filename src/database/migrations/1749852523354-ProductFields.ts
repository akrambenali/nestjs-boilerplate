import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductFields1749852523354 implements MigrationInterface {
  name = 'ProductFields1749852523354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "isActive" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "stock" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "unit" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unit"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "stock"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isActive"`);
  }
}
