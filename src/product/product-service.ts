import ProductInterface from "../../utils/interfaces/productInterfce";
import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";
import logger from "../../utils/serviceUtils/loggerUtil";
import { ProductDao } from "./product-dao";
import { validateProductRequestPayload } from "./product-validation";
import { v4 as uuidv4 } from "uuid";

export class ProductService {
  private productDao;

  constructor() {
    this.productDao = new ProductDao();
  }

  async create(author: any, params: any, body: any) {
    logger.info(
      `INSIDE CREATE PRODUCT SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // validate request payload
    const validationResult: ValidationResultInterface =
      validateProductRequestPayload(body);
    if (!validationResult.status) {
      throw new Error(validationResult.message);
    }

    // create product object
    const product: ProductInterface = this.createProductRequestPayload(body);

    // Inserting product into database
    const result: ProductInterface = await this.productDao.create(product);

    // returning result
    return result;
  }

  async update(author: any, params: any, body: any) {
    logger.info(
      `INSIDE UPDATE PRODUCT SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // validate request payload
    const validationResult: ValidationResultInterface =
      validateProductRequestPayload(body);

    if (!validationResult.status) {
      throw new Error(validationResult.message);
    }

    // create product object
    const product: ProductInterface = this.updateProductRequestPayload(body);

    // Inserting product into database
    const result: ProductInterface = await this.productDao.update(product);

    // returning result
    return result;
  }

  async get(author: any, params: any) {
    logger.info(`INSIDE GET PRODUCT SERVICE ${JSON.stringify(params)}`);

    // Inserting product into database
    const result: ProductInterface = await this.productDao.get(params);

    // returning result
    return result;
  }

  async getAll(author: any, params: any) {
    logger.info(`INSIDE GET PRODUCT SERVICE ${JSON.stringify(params)}`);

    // Inserting product into database
    const result: ProductInterface = await this.productDao.getAll(params);

    // returning result
    return result;
  }

  async delete(author: any, params: any) {
    logger.info(`INSIDE DELETE PRODUCT SERVICE ${JSON.stringify(params)}`);

    // Inserting product into database
    const result: ProductInterface = await this.productDao.delete(params);

    // returning result
    return result;
  }

  private createProductRequestPayload(payload: any): ProductInterface {
    return {
      productId: uuidv4(),
      createdTS: new Date().toISOString(),
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }

  private updateProductRequestPayload(payload: any): ProductInterface {
    return {
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }
}
