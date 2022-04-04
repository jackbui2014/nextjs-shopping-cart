import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { ICartItem } from './type';
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector, useAppDispatch } from '../../app/hook';
import { 
  addProduct,
  removeProduct,
  selectCart
 } from '../../app/cartReducer';

const cx = classNames.bind(styles);


export const CartItem: FunctionComponent<ICartItem> = (props) => {
  let { product,
        id, 
        quantity } = props;
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart);
  const handleAddItem = () => {
    dispatch( addProduct({ product: product, quantity: 1 }) );
  };
  const handleRemoveItem = () => {
    dispatch( removeProduct({ product: product }) );
  };
  return (
    <div className={cx(styles['cart-item-css'])} id={'cart-item-'+id}>
      <div className={cx(styles['cart-item-photo-css'], styles['column'])}>
      { product?.photo && (
        <Image 
          src={product?.photo} 
          alt={product?.title} 
          width="90"
          height="100"
          />
        )}
      </div>

      <div className={cx(styles['cart-item-info-css'], styles['column'])}>
        <p>{product?.title}</p>
        <p>Quantity: {quantity}</p>
        </div>
      <div className={cx(styles['cart-item-price-css'], styles['column'])}>
        <p id="total_price">Price: {product?.price}</p>
        <p>
          <button onClick={handleRemoveItem}>-</button>
          <button onClick={handleAddItem} >+</button>
        </p>
      </div>
    </div>
  )
}