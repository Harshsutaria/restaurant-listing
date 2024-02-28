import ProductInterface from "./productInterfce";

export default interface OrderInterface {
  customerId: string,
  deliveryAddress: string,
  orderValue: number;
  productList: Array<ProductInterface>;
  orderStatus: string;
  paymentMethod: string;
  createdTS: string;
  updatedTS: string;
}
