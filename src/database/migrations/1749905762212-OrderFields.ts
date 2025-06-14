import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderFields1749905762212 implements MigrationInterface {
  name = 'OrderFields1749905762212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "paymentStatus" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "totalAmount" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "userId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalAmount"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "paymentStatus"`);
  }
}
