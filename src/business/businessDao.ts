import BusinessInterface from "../../utils/interfaces/businessInterfce";
import logger from "../../utils/serviceUtils/loggerUtil";
import { Postgres } from "../../utils/serviceUtils/postgres/postgresUtil";
import { serviceConstants } from "../constants/service-constants";

export class BusinessDao {
  // setting dataBaseName for the dao class
  private dataBaseName: string = serviceConstants.DATABASE;

  // setting tableName for the dao class
  private tableName: string = serviceConstants.BUSINESS_TABLE;

  // setting property for creating connection
  postgres: any;

  constructor() {
    // creating postgres client
    this.postgres = new Postgres();
  }

  async create(business: BusinessInterface): Promise<BusinessInterface> {
    return this.createBusinessInPostgres(business);
  }

  async update(business: BusinessInterface): Promise<BusinessInterface> {
    return this.updateBusinessInPostgres(business);
  }

  async get(params: any): Promise<BusinessInterface> {
    return this.getBusinessFromPostgres(params.businessId);
  }

  async getAll(params: any): Promise<BusinessInterface> {
    return this.getAllBusinessFromPostgres(params);
  }

  async delete(params: any): Promise<BusinessInterface> {
    return this.deleteBusinessFromPostgres(params.businessId);
  }

  private async createBusinessInPostgres(
    business: BusinessInterface
  ): Promise<BusinessInterface> {
    let data: any;
    const sqlQuery: string = `INSERT INTO ${this.tableName}(
        "businessId","businessName",
        "ownerId","ownerName",
        "businessContactNumber","businessCity",
        "businessAddress", "imagesPath",
        "createdTS","updatedTS") values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        business.businessId,
        business.businessName,
        business.ownerId,
        business.ownerName,
        business.businessContactNumber,
        business.businessCity,
        business.businessAddress,
        business.imagesPath,
        business.createdTS,
        business.updatedTS,
      ]);
      logger.info(`Business creation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while inserting product ${error}`);
      throw new Error(`Getting error while inserting product ${error}`);
    }

    return business;
  }

  private async updateBusinessInPostgres(
    business: BusinessInterface
  ): Promise<BusinessInterface> {
    logger.info(
      `INSIDE updateBusinessInPostgres METHOD ${JSON.stringify(business)}`
    );

    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `UPDATE ${this.tableName} 
        SET  
            "businessName"=$1 ,"businessContactNumber" = $2,
            "businessAddress"=$3 ,"imagesPath" = $4,
            "updatedTS" = $5

        WHERE "businessId" = $6
        `;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        business.businessName,
        business.businessContactNumber,
        business.businessAddress,
        business.imagesPath,
        business.updatedTS,
        business.businessId,
      ]);
      logger.info(`Business Updation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while updation business ${error}`);
      throw new Error(`Getting error while updation business ${error}`);
    }

    return business;
  }

  private async getBusinessFromPostgres(
    businessId: string
  ): Promise<BusinessInterface> {
    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `SELECT * FROM ${this.tableName} where "businessId" = $1`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [businessId]);
      logger.info(`Business Fetch by Id dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while fetching Business ${error}`);
      throw new Error(`Getting error while fetching Business ${error}`);
    }

    return data;
  }

  private async getAllBusinessFromPostgres(
    params: any
  ): Promise<BusinessInterface> {
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
      logger.info(`Business Fetch dao operation is successful`);
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

  private async deleteBusinessFromPostgres(
    businessId: string
  ): Promise<BusinessInterface> {
    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `DELETE FROM ${this.tableName} where "businessId" = $1`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [businessId]);
      logger.info(`Business Deletion by Id dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while deletion Business ${error}`);
      throw new Error(`Getting error while deletion Business ${error}`);
    }

    return data;
  }
}
