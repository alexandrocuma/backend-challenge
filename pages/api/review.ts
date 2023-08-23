import { NextApiHandler } from "next";
import db from "../../db/db";

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

/**
 * POST /api/review
 *
 * Your API must return receive data in this format.
 */
interface CreateReviewData {
  productId: string;
  rating: number;
  comment: string;
}

/**
 * POST /api/review
 *
 * Your API must return a response in this format.
 */
interface CreateReviewResponse {
  success: boolean;
  review: Review;
}

/**
 * GET /api/review
 *
 * Gets a list of reviews for a product
 *
 * Your API must return receive data in this format.
 */
interface GetReviewsQuery {
  productId: string;
}

/**
 * GET /api/review
 *
 * Gets a list of reviews for a product
 *
 * Your API must return a response in this format.
 */
interface GetReviewsResponse {
  success: boolean;
  reviews: Review[];
}

const reviewEndpointHandler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    return res.status(405).end();
  }
  if (req.method === "POST") {
    const { product_id } = req.query;
    const { comment, rating } = req.body;

    const review = (await db.query(
      "INSERT INTO review (product_id, comment, rating, date) VALUES ($1, $2, $3, NOW())",
      [product_id, comment, rating]
    )) as Review;

    const response: CreateReviewResponse = {
      success: true,
      review,
    };
    res.status(200).json(response);
  }
  return res.status(405).end();
};

export default reviewEndpointHandler;
