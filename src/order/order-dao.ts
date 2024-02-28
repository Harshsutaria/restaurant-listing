import OrderInterface from "../../utils/interfaces/orderInterface";
import logger from "../../utils/serviceUtils/loggerUtil";
import { Postgres } from "../../utils/serviceUtils/postgres/postgresUtil";
import { serviceConstants } from "../constants/service-constants";

export class OrderDao {
  // setting dataBaseName for the dao class
  private dataBaseName: string = serviceConstants.DATABASE;

  // setting tableName for the dao class
  private tableName: string = serviceConstants.ORDER_TABLE;

  // setting property for creating connection
  postgres: any;

  constructor() {
    // creating postgres client
    this.postgres = new Postgres();
  }

  async create(order: OrderInterface): Promise<OrderInterface> {
    return this.createOrderInPostgres(order);
  }

  async update(order: OrderInterface): Promise<OrderInterface> {
    return this.updateOrderInPostgres(order);
  }

  private async createOrderInPostgres(
    order: OrderInterface
  ): Promise<OrderInterface> {
    let data: any;

    // Preparing SQL query
    const sqlQuery: string = `INSERT INTO ${this.tableName}(
        "orderId","customerId",
        "deliveryAddress","orderValue",
        "productList","orderStatus",
        "paymentMethod",
        "createdTS",
        "updatedTS") values($1,$2,$3,$4,CAST($5 as jsonb),$6,$7,$8,$9)`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        order.orderId,
        order.customerId,
        order.deliveryAddress,
        order.orderValue,
        JSON.stringify(order.productList),
        order.orderStatus,
        order.paymentMethod,
        order.createdTS,
        order.updatedTS,
      ]);
      logger.info(`Order creation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while creating Order ${error}`);
      throw new Error(`Getting error while creating Order ${error}`);
    }

    logger.info(`data is ${JSON.stringify(data)}`);
    return order;
  }

  private async updateOrderInPostgres(
    order: OrderInterface
  ): Promise<OrderInterface> {
    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `UPDATE ${this.tableName} 
        SET  
            "deliveryAddress"=$2 ,"orderStatus" = $3,
            "updatedTS" = $4

        WHERE "orderId" = $1
        `;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        order.orderId,
        order.deliveryAddress,
        order.orderStatus,
        order.updatedTS,
      ]);
      logger.info(`Order Updation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while updation Order ${error}`);
      throw new Error(`Getting error while updation Order ${error}`);
    }

    return order;
  }
}
