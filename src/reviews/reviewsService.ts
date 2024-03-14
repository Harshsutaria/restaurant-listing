import ReviewsInterface from "../../utils/interfaces/ReviewInterface";
import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";
import logger from "../../utils/serviceUtils/loggerUtil";
import { ReviewsDao } from "./reviewsDao";
import { validateReviewRequestPayload } from "./reviewsValidator";
import { v4 as uuidv4 } from "uuid";

export class ReviewsService {
  private reviewDao;

  constructor() {
    this.reviewDao = new ReviewsDao();
  }

  async create(author: any, params: any, body: any) {
    logger.info(
      `INSIDE CREATE REVIEW SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // validate request payload
    const validationResult: ValidationResultInterface =
      validateReviewRequestPayload(body);
    if (!validationResult.status) {
      throw new Error(validationResult.message);
    }

    // create review object
    const review: ReviewsInterface = this.createReviewRequestPayload(body);

    // Inserting review into database
    const result: ReviewsInterface = await this.reviewDao.create(review);

    // returning result
    return result;
  }

  async update(author: any, params: any, body: any) {
    logger.info(
      `INSIDE UPDATE REVIEW SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // validate request payload
    const validationResult: ValidationResultInterface =
      validateReviewRequestPayload(body);

    if (!validationResult.status) {
      throw new Error(validationResult.message);
    }

    // create review object
    const review: ReviewsInterface = this.updateReviewRequestPayload(body);

    // Updating review into database
    const result: ReviewsInterface = await this.reviewDao.update(review);

    // returning result
    return result;
  }

  async get(author: any, params: any) {
    logger.info(`INSIDE GET REVIEW SERVICE ${JSON.stringify(params)}`);

    // Fetching review from database
    const result: ReviewsInterface = await this.reviewDao.get(params);

    // returning result
    return result;
  }

  async getAll(author: any, params: any) {
    logger.info(`INSIDE GET ALL REVIEWS SERVICE ${JSON.stringify(params)}`);

    // Fetching Review into database
    const result: ReviewsInterface = await this.reviewDao.getAll(params);

    // returning result
    return result;
  }

  async delete(author: any, params: any) {
    logger.info(`INSIDE DELETE REVIEW SERVICE ${JSON.stringify(params)}`);

    // Deleting REVIEW from database
    const result: ReviewsInterface = await this.reviewDao.delete(params);

    // returning result
    return result;
  }

  private createReviewRequestPayload(payload: any): ReviewsInterface {
    return {
      reviewId: uuidv4(),
      createdTS: new Date().toISOString(),
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }

  private updateReviewRequestPayload(payload: any): ReviewsInterface {
    return {
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }
}
