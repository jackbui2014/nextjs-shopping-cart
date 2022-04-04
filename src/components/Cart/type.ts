import { IProduct } from "../Products/type";
export interface ICartItem {
  id: string;
  product: IProduct;
  quantity: number;
}
export interface ICart {
  className?: string;
  items?: ICartItem[];
  salesTax?: number;
  subPrice?: number;
  totalPrice?: number;
  totalItems?: number;
}
