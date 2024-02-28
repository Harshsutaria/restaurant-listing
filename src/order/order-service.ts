import UserInterface from "../../utils/interfaces/userInterface";
import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";
import { OrderDao } from "./order-dao";
import { validateOrderRequestPayload } from "./order-validation";
import { v4 as uuidv4 } from "uuid";
import logger from "../../utils/serviceUtils/loggerUtil";
import orderItemsInterface from "../../utils/interfaces/orderItemsInterface";
import ProductInterface from "../../utils/interfaces/productInterfce";
import { ProductDao } from "../product/product-dao";
import OrderInterface from "../../utils/interfaces/orderInterface";
import HTTPConst from "../../utils/serviceUtils/HttpStatusCodes";

export class OrderService {
  private orderDao;

  private productDao;

  constructor() {
    this.productDao = new ProductDao();
    this.orderDao = new OrderDao();
  }

  async create(author: any, params: any, body: any) {
    logger.info(
      `INSIDE CREATE ORDER SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // validate request payload
    const validationResult: ValidationResultInterface =
      validateOrderRequestPayload(body);
    if (!validationResult.status) {
      throw new Error(validationResult.message);
    }

    // fetch product details after validation
    const productList: Array<ProductInterface> = await this.getValidProductData(
      body.productList
    );

    body.productList = productList;

    // Doing the payment via payment gateway.
    const paymentResponse: any = await this.completePayment(body.paymentMethod);

    if (paymentResponse.code !== HTTPConst.success.ACCEPTED) {
      throw new Error(`Payment method not accepted ${body.paymentMethod}`);
    }

    // logger.info(`payment is successfully!!!`);
    // create product object
    const order: OrderInterface = this.createOrderRequestPayload(body);

    // Inserting product into database
    const result: OrderInterface = await this.orderDao.create(order);

    // returning result
    return result;
  }

  async update(author: any, params: any, body: any) {
    logger.info(
      `INSIDE UPDATE ORDER SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // create order object
    const order: OrderInterface = this.updateUserRequestPayload(body);

    // Inserting user into database
    const result: OrderInterface = await this.orderDao.update(order);

    // returning result
    return result;
  }

  private async getValidProductData(
    productList: orderItemsInterface
  ): Promise<Array<ProductInterface>> {
    const products: Array<ProductInterface> = [];

    for (let product of productList) {
      let productData: any = await this.productDao.get({
        productId: product.productId,
      });
      // validating product availability
      if (!Array.isArray(productData) && !productData.length) {
        throw new Error(`Product Not Found For ${product.productId}`);
      }

      productData = productData[0];
      // validating product quantity
      if (product.quantity > productData.quantity) {
        throw new Error(
          `Product Available Quantity Is Less Than Requested Quantity For ${product.productId}`
        );
      }

      // updating product quantity based on the request payload
      productData.quantity = product.quantity;
      products.push(productData);
    }

    logger.info(`Order Items Fetched Successfully!!!!!!`);
    return products;
  }

  /**
   * Mocking the payment gateway response to minimize scope of the requirement
   * @param paymentMethod
   * @returns Promise<object>
   */
  private completePayment(paymentMethod: string): Promise<object> {
    logger.info(`payment method is ${JSON.stringify(paymentMethod)}`);

    if (["CARD", "UPI"].includes(paymentMethod)) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          res({
            code: HTTPConst.success.ACCEPTED,
            message:
              "Payment successfully Completed. Redirecting to client website",
          });
        }, 3000);
      });
    }

    return Promise.reject(`Payment method not supported ${paymentMethod}`);
  }

  private createOrderRequestPayload(payload: any): OrderInterface {
    return {
      orderId: `${uuidv4()}_order`,
      orderStatus: `PLACED`,
      createdTS: new Date().toISOString(),
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }

  private updateUserRequestPayload(payload: any): OrderInterface {
    return {
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }
}
