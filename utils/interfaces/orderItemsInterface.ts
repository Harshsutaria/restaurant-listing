export interface orderItemInterface{
    productId: string,
    mrp: number,
    quantity: number,
}

export default interface orderItemsInterface extends Array<orderItemInterface> {}
