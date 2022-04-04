import React, { FunctionComponent } from 'react';
import { ICart, ICartItem } from './type';
import { CartItem } from './CartItem';
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector, useAppDispatch } from '../../app/hook';
import { 
  addProduct, 
  removeProduct, 
  emptyCart, 
  selectCart } from '../../app/cartReducer';

const cx = classNames.bind(styles);


export const Cart: FunctionComponent<ICart> = (props) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  if( cart?.items && cart?.items.length> 0 ){
      return (
        <>
        <h2>Cart (<span id="cart_total_items" data-testid="cart_total_items">{cart.totalItems}</span>)</h2>
        <div className={cx(styles['cart-css'], props.className)}>
              { cart?.items.map((item:ICartItem, index: number)=>(
                <CartItem {...item} key={"cart-item-"+index} />
                ))
              }
          <div className={cx(styles['cart-summary-css'])}>
            <p>Sales Tax: <span id="cart-sales-tax" data-testid="cart-sales-tax">{cart.salesTax?.toFixed(2)}</span></p>
            <p>Total: <span id="cart-total-price" data-testid="cart-total-price">{cart.totalPrice?.toFixed(2)}</span></p>
            </div>
        </div>
        </>
      );
  }
  return (
    <>
    <h2>Cart (<span id="cart_total_items" data-testid="cart_total_items-0">{cart.totalItems}</span>)</h2>
    <div className={cx(styles['cart-css'], props.className)}>
      Cart is empty.
    </div>
    </>
  );
  
}