import BusinessInterface from "../../utils/interfaces/businessInterfce";
import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";
import logger from "../../utils/serviceUtils/loggerUtil";
import { BusinessDao } from "./businessDao";
import { validateBusinessRequestPayload } from "./businessValidator";
import { v4 as uuidv4 } from "uuid";

export class BusinessService {
  private businessDao;

  constructor() {
    this.businessDao = new BusinessDao();
  }

  async create(author: any, params: any, body: any) {
    logger.info(
      `INSIDE CREATE BUSINESS SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // validate request payload
    const validationResult: ValidationResultInterface =
      validateBusinessRequestPayload(body);
    if (!validationResult.status) {
      throw new Error(validationResult.message);
    }

    // create business object
    const business: BusinessInterface = this.createBusinessRequestPayload(body);

    // Inserting business into database
    const result: BusinessInterface = await this.businessDao.create(business);

    // returning result
    return result;
  }

  async update(author: any, params: any, body: any) {
    logger.info(
      `INSIDE UPDATE BUSINESS SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // validate request payload
    const validationResult: ValidationResultInterface =
      validateBusinessRequestPayload(body);

    if (!validationResult.status) {
      throw new Error(validationResult.message);
    }

    // create business object
    const business: BusinessInterface = this.updateBusinessRequestPayload(body);

    // Updating business into database
    const result: BusinessInterface = await this.businessDao.update(business);

    // returning result
    return result;
  }

  async get(author: any, params: any) {
    logger.info(`INSIDE GET BUSINESS SERVICE ${JSON.stringify(params)}`);

    // Fetching business from database
    const result: BusinessInterface = await this.businessDao.get(params);

    // returning result
    return result;
  }

  async getAll(author: any, params: any) {
    logger.info(`INSIDE GET ALL BUSINESS SERVICE ${JSON.stringify(params)}`);

    // Fetching Business into database
    const result: BusinessInterface = await this.businessDao.getAll(params);

    // returning result
    return result;
  }

  async delete(author: any, params: any) {
    logger.info(`INSIDE DELETE Business SERVICE ${JSON.stringify(params)}`);

    // Deleting Business from database
    const result: BusinessInterface = await this.businessDao.delete(params);

    // returning result
    return result;
  }

  private createBusinessRequestPayload(payload: any): BusinessInterface {
    return {
      businessId: uuidv4(),
      createdTS: new Date().toISOString(),
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }

  private updateBusinessRequestPayload(payload: any): BusinessInterface {
    return {
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }
}
