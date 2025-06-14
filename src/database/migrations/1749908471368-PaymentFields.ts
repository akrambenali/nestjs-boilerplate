import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentFields1749908471368 implements MigrationInterface {
  name = 'PaymentFields1749908471368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "method"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "method" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "method"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "method" character varying NOT NULL`,
    );
  }
}
