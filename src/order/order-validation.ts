import orderItemsInterface, { orderItemInterface } from "../../utils/interfaces/orderItemsInterface";
import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";

export function validateUserRequestPayload(payload: any): ValidationResultInterface {
  const validationResult: ValidationResultInterface = {
    status: true,
    message: `Order validation successfully`,
  };

  if (!payload.customerId) {
    validationResult.status = false;
    validationResult.message = "Customer ID is mandatory for creating order";
    return validationResult;
  }

  if (!payload.deliveryAddress) {
    validationResult.status = false;
    validationResult.message = "Delivery address is mandatory for creating order";
    return validationResult;
  }

  if (payload.orderValue === undefined) {
    validationResult.status = false;
    validationResult.message = "Order value is mandatory for creating order";
    return validationResult;
  }

  if (payload.paymentMethod === undefined) {
    validationResult.status = false;
    validationResult.message = "Payment Method is mandatory for creating order";
    return validationResult;
  }

  if(validateOrderItems(payload.productList)){
    validationResult.status = false;
    validationResult.message = "Order items are invalid";
    return validationResult;
  }

  return validationResult;
}

/**
 * Method to specifically validate order items
 * @param productList 
 * @returns 
 */
function validateOrderItems(productList: orderItemsInterface){

  productList.forEach((product: orderItemInterface) => {
    if(!product.productId || product.mrp === undefined || product.quantity === undefined){
      return true;
    }
  });

  return false;
}