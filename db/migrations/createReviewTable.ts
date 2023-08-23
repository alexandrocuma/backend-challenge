import db from "../db";
import { faker } from "@faker-js/faker";

// TODO: Empty migration
const createReviewMigration = `
  CREATE TABLE IF NOT EXISTS review(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id integer REFERENCES product(id),
    date date,
    comment text,
    rating integer
  )
`;

export const createReviewTable = async () => {
  console.log("Running db/migrations/createReviewTable migration...");
  await db.query(createReviewMigration);
  console.log("Completed db/migrations/createReviewTable migration.");
};
