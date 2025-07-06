import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrder31751637036821 implements MigrationInterface {
  name = 'UpdateOrder31751637036821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" ADD "orderItem" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD "order" jsonb NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "order"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderItem"`);
  }
}
