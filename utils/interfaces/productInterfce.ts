export default interface ProductInterface {
  productId: string;
  productTitle: string;
  productCategory: string;
  productDescription?: string;
  mrp: number;
  sellingPrice: number;
  manufacturer: string;
  quantity: number;
  units: string;
  shelfLife: string;
  createdTS: string;
  updatedTS: string;
}
