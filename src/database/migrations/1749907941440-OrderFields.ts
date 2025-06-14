import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderFields1749907941440 implements MigrationInterface {
  name = 'OrderFields1749907941440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "paymentStatus"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "paymentStatus" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "paymentStatus"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "paymentStatus" character varying NOT NULL`,
    );
  }
}
