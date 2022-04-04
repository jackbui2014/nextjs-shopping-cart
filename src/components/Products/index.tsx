import React, { FunctionComponent } from 'react';
import { ProductItem } from './ProductItem';
import { IProducts } from './type';
import styles from './Products.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Products: FunctionComponent<IProducts> = (props) => {
  let { items } = props;
  return (
    <>
    <h2>Products</h2>
    <div className={cx(styles['products-css'], props.className)}>
      {items?.map((item, index) => (
          <ProductItem key={'product-item-'+index} product={item.product} />
      ))}
    </div>
  </>
)}