import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { ICart, ICartItem } from '../components/Cart/type';
import { IProduct } from '../components/Products/type';
import  { appConfig }  from '../config/appConfig';
import type { AppState, AppThunk } from './store'

const initialState = { 
  items: [],
  totalPrice: 0,
  totalItems: 0,
  salesTax: 0
 } as ICart;
 
export const priceFormat = (price: number)=>{
  const p = Math.pow(10, 2);
  const n = Number((price * p).toPrecision(15));
  return Math.round(n) / p;
} 
export const cartUpdate = ( items:ICartItem[] )=>{
  let totalPrice = 0;
  let totalItems = 0;
  let salesTax = 0;
  let subPrice = 0
  items.forEach( (item: ICartItem) =>{
    subPrice+= item.product.price * item.quantity;
    totalItems+= item.quantity;
  });
  salesTax = subPrice*appConfig.salesTax/100;
  totalPrice = subPrice + salesTax;
  return {
    totalItems: totalItems,
    salesTax: priceFormat(salesTax),
    totalPrice: priceFormat(totalPrice)
  };
}

export const inCart = (product: IProduct, items: ICartItem[] ) =>{
  if( items && items.length > 0 ){
    const foundProduct = items.find(( {id} )=> id === product.sku);
    if( foundProduct ){
      return foundProduct;
    }
  }
  return false;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    addProduct(state: ICart, action: any) {
      const payload = action.payload;
      if( state?.items ){
        const foundProduct = inCart(payload.product, state?.items);
        if( foundProduct ){
          foundProduct.quantity++;
        }
        else{
          state?.items?.push({
            product: payload.product,
            quantity: payload.quantity,
            id: payload.product.sku
          });
        }
        const cartUpdated = cartUpdate(state.items);
        state.totalPrice = cartUpdated.totalPrice;
        state.totalItems = cartUpdated.totalItems;
        state.salesTax = cartUpdated.salesTax;
      }
    },
    removeProduct(state: ICart, action: any){
      const payload = action.payload;
      if( state?.items && state?.items.length > 0 ){
        const foundProduct = inCart(payload.product, state?.items);
        if( foundProduct ){
          if( foundProduct.quantity > 1 ){
            foundProduct.quantity--;
          }
          else{
            state.items = state?.items.filter((item:ICartItem)=> item.id !== foundProduct.id );
          }
          const cartUpdated = cartUpdate(state.items);
          state.totalPrice = cartUpdated.totalPrice;
          state.totalItems = cartUpdated.totalItems;
          state.salesTax = cartUpdated.salesTax;
        }
      }
    },
    emptyCart( state: ICart, action: any){
      
    }
  },
})

export const { addProduct, removeProduct, emptyCart } = cartSlice.actions;
export const selectCart = (state: AppState) => state.cart;
export default cartSlice.reducer