import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { IProductItem } from './type';
import styles from './Products.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector, useAppDispatch } from '../../app/hook';
import { 
  addProduct,
  selectCart
 } from '../../app/cartReducer';

const cx = classNames.bind(styles);

export const ProductItem: FunctionComponent<IProductItem> = (props) => {
 const { product } = props;
 const dispatch = useAppDispatch()
 const cart = useAppSelector(selectCart);

  const handleAddProduct = () => {
    dispatch( addProduct({ product: product, quantity: 1 }) );
  };
  return (
  <div className={cx(styles['product-item-css'], props.className)} >
    { product?.photo && (
    <Image 
      src={product?.photo} 
      alt={product?.title} 
      width="360"
      height="400"
      />
      )}
    <h1>{product?.title}</h1>
    <p className={cx(styles['price'])}>{product?.price}</p>
    { product?.description && (
      <p>{product.description}</p>
    )}
    <button onClick={handleAddProduct} id={"add-to-cart-"+product?.sku} data-testid={"add-to-cart-"+product?.sku} >Add to Cart</button>
  </div>
)}