CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "emai" text NOT NULL,
  "cpf" int NOT NULL,
  "birth" timestamp NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "cnpj" int NOT NULL,
  "phone" int NOT NULL
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "logradouro" text NOT NULL,
  "number" int NOT NULL,
  "city" text NOT NULL,
  "state" text NOT NULL,
  "postal_code" int NOT NULL
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "description" text NOT NULL,
  "manufacture" text NOT NULL,
  "reviewed" int DEFAULT 1,
  "last_review" timestamp NOT NULL
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "model_year" int NOT NULL,
  "manufacture_yaer" int NOT NULL,
  "potency" text NOT NULL DEFAULT '1.0L'
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "description" text NOT NULL,
  "price" int NOT NULL,
  "quantity" int NOT NULL DEFAULT 1,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "cars_orders" (
  "id" SERIAL PRIMARY KEY
);

ALTER TABLE "addresses" ADD FOREIGN KEY ("id") REFERENCES "agencies" ("id");

ALTER TABLE "cars" ADD FOREIGN KEY ("id") REFERENCES "models" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("id") REFERENCES "customers" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("id") REFERENCES "agencies" ("id");

ALTER TABLE "cars_orders" ADD FOREIGN KEY ("id") REFERENCES "cars" ("id");

ALTER TABLE "cars_orders" ADD FOREIGN KEY ("id") REFERENCES "orders" ("id");
