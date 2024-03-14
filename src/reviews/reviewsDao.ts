import ReviewsInterface from "../../utils/interfaces/ReviewInterface";
import logger from "../../utils/serviceUtils/loggerUtil";
import { Postgres } from "../../utils/serviceUtils/postgres/postgresUtil";
import { serviceConstants } from "../constants/service-constants";

export class ReviewsDao {
  // setting dataBaseName for the dao class
  private dataBaseName: string = serviceConstants.DATABASE;

  // setting tableName for the dao class
  private tableName: string = serviceConstants.REVIEW_TABLE;

  // setting property for creating connection
  postgres: any;

  constructor() {
    // creating postgres client
    this.postgres = new Postgres();
  }

  async create(reviews: ReviewsInterface): Promise<ReviewsInterface> {
    return this.createReviewsInPostgres(reviews);
  }

  async update(reviews: ReviewsInterface): Promise<ReviewsInterface> {
    return this.updateReviewInPostgres(reviews);
  }

  async get(params: any): Promise<ReviewsInterface> {
    return this.getReviewFromPostgres(params.reviewId);
  }

  async getAll(params: any): Promise<ReviewsInterface> {
    return this.getAllReviewsFromPostgres(params);
  }

  async delete(params: any): Promise<ReviewsInterface> {
    return this.deleteReviewFromPostgres(params.reviewId);
  }

  private async createReviewsInPostgres(
    review: ReviewsInterface
  ): Promise<ReviewsInterface> {
    let data: any;
    logger.info(`Review object is ${JSON.stringify(review)}`);
    const sqlQuery: string = `INSERT INTO ${this.tableName}(
       "reviewId","businessId","userId",
        "review","rating",
        "reply", "createdTS",
        "updatedTS") values($1,$2,$3,$4,$5,$6,$7,$8)`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        review.reviewId,
        review.businessId,
        review.userId,
        review.review,
        review.rating,
        review.reply || "",
        review.createdTS,
        review.updatedTS,
      ]);
      logger.info(`Review creation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while inserting product ${error}`);
      throw new Error(`Getting error while inserting product ${error}`);
    }

    return review;
  }

  private async updateReviewInPostgres(
    review: ReviewsInterface
  ): Promise<ReviewsInterface> {
    logger.info(
      `INSIDE updateReviewInPostgres METHOD ${JSON.stringify(review)}`
    );

    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `UPDATE ${this.tableName} 
        SET  
            "reply"=$1 ,"rating" = $2, "updatedTS" = $3
        WHERE "reviewId" = $4
        `;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        review.reply,
        review.rating,
        review.updatedTS,
        review.reviewId,
      ]);
      logger.info(`Review Updation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while updation review ${error}`);
      throw new Error(`Getting error while updation review ${error}`);
    }

    return review;
  }

  private async getReviewFromPostgres(
    reviewId: string
  ): Promise<ReviewsInterface> {
    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `SELECT * FROM ${this.tableName} where "reviewId" = $1`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [reviewId]);
      logger.info(`Review Fetch by Id dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while fetching Review ${error}`);
      throw new Error(`Getting error while fetching Review ${error}`);
    }

    return data;
  }

  private async getAllReviewsFromPostgres(
    params: any
  ): Promise<ReviewsInterface> {
    // setting pagination params
    let data: any;
    const offset: number = params.offset || 0;
    const limit: number = params.limit || 10;
    const result: any = {
      count: 0,
      business: [],
    };

    // Preparing sql update query
    const sqlQuery: string = `SELECT count(*)over(), * FROM ${this.tableName} offset ${offset} limit ${limit}`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, []);
      logger.info(`Review Fetch dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while fetching product ${error}`);
      throw new Error(`Getting error while fetching product ${error}`);
    }

    // returning data
    if (Array.isArray(data) && data.length) {
      result.count = data[0].count;
      result.business = data;
    }

    return result;
  }

  private async deleteReviewFromPostgres(
    reviewId: string
  ): Promise<ReviewsInterface> {
    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `DELETE FROM ${this.tableName} where "reviewId" = $1`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [reviewId]);
      logger.info(`Review Deletion by Id dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while deletion Review ${error}`);
      throw new Error(`Getting error while deletion Review ${error}`);
    }

    return data;
  }
}
