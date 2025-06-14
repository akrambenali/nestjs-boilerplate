import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentFields1749906577243 implements MigrationInterface {
  name = 'PaymentFields1749906577243';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "method" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "paymentDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "amount" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "orderId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "orderId"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentDate"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "method"`);
  }
}
