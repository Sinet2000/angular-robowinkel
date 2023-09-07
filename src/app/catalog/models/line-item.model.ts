import {IProduct} from "./product.model";

export interface ILineItem {
  qty: number;
  product: IProduct;
}
