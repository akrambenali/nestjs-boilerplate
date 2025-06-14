import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderFields1749907291568 implements MigrationInterface {
  name = 'OrderFields1749907291568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status" character varying NOT NULL`,
    );
  }
}
