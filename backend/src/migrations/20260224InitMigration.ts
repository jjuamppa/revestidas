import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init20260224Migration implements MigrationInterface {
  name = 'Init20260224Migration'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await queryRunner.query(`CREATE TABLE "users" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "email" character varying NOT NULL,
      "passwordHash" character varying NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
      CONSTRAINT "UQ_users_email" UNIQUE (email)
    );`);

    await queryRunner.query(`CREATE TABLE "products" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "title" character varying NOT NULL,
      "description" text,
      "price" numeric(10,2) NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
    );`);

    await queryRunner.query(`CREATE TABLE "images" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "filename" character varying NOT NULL,
      "url" character varying NOT NULL,
      "orderIndex" integer DEFAULT 0,
      "productId" uuid,
      CONSTRAINT "FK_images_product" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "images";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "products";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users";`);
    // keep pgcrypto extension since other apps may use it
  }
}
