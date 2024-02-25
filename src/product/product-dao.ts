import ProductInterface from "../../utils/interfaces/productInterfce";
import logger from "../../utils/serviceUtils/loggerUtil";
import { Postgres } from "../../utils/serviceUtils/postgres/postgresUtil";
import { serviceConstants } from "../constants/service-constants";

export class ProductDao {
  // setting dataBaseName for the dao class
  private dataBaseName: string = serviceConstants.DATABASE;

  // setting tableName for the dao class
  private tableName: string = serviceConstants.PRODUCT_TABLE;

  // setting property for creating connection
  postgres: any;

  constructor() {
    // creating postgres client
    this.postgres = new Postgres();
  }

  async create(product: ProductInterface): Promise<ProductInterface> {
    return this.createProductInPostgres(product);
  }

  async update(product: ProductInterface): Promise<ProductInterface> {
    return this.updateProductInPostgres(product);
  }

  async get(params: any): Promise<ProductInterface> {
    return this.getProductFromPostgres(params.productId);
  }

  async getAll(params: any): Promise<ProductInterface> {
    return this.getAllProductFromPostgres(params);
  }

  async delete(params: any): Promise<ProductInterface> {
    return this.deleteProductFromPostgres(params.productId);
  }

  private async createProductInPostgres(
    product: ProductInterface
  ): Promise<ProductInterface> {
    let data: any;
    const sqlQuery: string = `INSERT INTO ${this.tableName}(
        "productId","productTitle",
        "productCategory","productDescription",
        "manufacturer","mrp",
        "sellingPrice", "quantity",
        "units","shelfLife",
        "createdTS","updatedTS") values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        product.productId,
        product.productTitle,
        product.productCategory,
        product.productDescription || "",
        product.manufacturer,
        String(product.mrp),
        String(product.sellingPrice),
        String(product.quantity),
        product.units,
        product.shelfLife,
        product.createdTS,
        product.updatedTS,
      ]);
      logger.info(`Product creation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while inserting product ${error}`);
      throw new Error(`Getting error while inserting product ${error}`);
    }

    logger.info(`data is ${JSON.stringify(data)}`);
    return product;
  }

  private async updateProductInPostgres(
    product: ProductInterface
  ): Promise<ProductInterface> {
    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `UPDATE ${this.tableName} 
        SET  
            "productTitle"=$1 ,"productCategory" = $2,
            "productDescription"=$3 ,"manufacturer" = $4,
            "mrp"=$5 ,"sellingPrice" = $6,
            "quantity"= $7, "updatedTS" = $8

        WHERE "productId" = $9
        `;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        product.productTitle,
        product.productCategory,
        product.productDescription || "",
        product.manufacturer,
        String(product.mrp),
        String(product.sellingPrice),
        String(product.quantity),
        product.updatedTS,
        product.productId,
      ]);
      logger.info(`Product Updation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while updation product ${error}`);
      throw new Error(`Getting error while updation product ${error}`);
    }

    return product;
  }

  private async getProductFromPostgres(
    productId: string
  ): Promise<ProductInterface> {
    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `SELECT * FROM ${this.tableName} where "productId" = $1`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [productId]);
      logger.info(`Product Fetch by Id dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while fetching product ${error}`);
      throw new Error(`Getting error while fetching product ${error}`);
    }

    return data;
  }

  private async getAllProductFromPostgres(
    params: any
  ): Promise<ProductInterface> {
    // setting pagination params
    let data: any;
    const offset: number = params.offset || 0;
    const limit: number = params.limit || 10;
    const result: any = {
      count: 0,
      products: [],
    };

    // Preparing sql update query
    const sqlQuery: string = `SELECT count(*)over(), * FROM ${this.tableName} offset ${offset} limit ${limit}`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, []);
      logger.info(`Product Fetch dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while fetching product ${error}`);
      throw new Error(`Getting error while fetching product ${error}`);
    }

    // returning data
    if (Array.isArray(data) && data.length) {
      result.count = data[0].count;
      result.products = data;
    }

    return result;
  }

  private async deleteProductFromPostgres(
    productId: string
  ): Promise<ProductInterface> {
    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `DELETE FROM ${this.tableName} where "productId" = $1`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [productId]);
      logger.info(`Product Deletion by Id dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while deletion product ${error}`);
      throw new Error(`Getting error while deletion product ${error}`);
    }

    return data;
  }
}
