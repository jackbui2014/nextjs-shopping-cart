
export interface IProduct {
  id: string;
  sku: string;
  title: string;
  description?: string;
  price: number;
  currencyFormat?: string;
  currencyId?: string;
  tax: number;
  photo?: string;
}
export interface IProductItem {
  className?: string;
  product?: IProduct;
}
export interface IProducts {
  className?: string;
  items?: IProductItem[];
}
