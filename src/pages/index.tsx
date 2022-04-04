import React, { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Products } from '../components/Products';
import { Cart } from '../components/Cart';
import styles from '../styles/Home.module.css'
import { ICartItem } from '../components/Cart/type';
import { useAppSelector } from '../app/hook';
import { 
  selectCart
 } from '../app/cartReducer';

const Home: NextPage = () => {
  const cart = useAppSelector(selectCart);
  const productData = [
    {"product": {
      "id": "0",
      "sku": "sku0",
      "title": "Dove Soap",
      "currencyFormat": "$",
      "currencyId": "USD",
      "price": 39.99,
      "tax": 12.5,
      "photo": "/assets/images/dovesoap.png"

    }},
    {"product":{
      "id": "1",
      "sku": "sku1",
      "title": "Axe Deo",
      "currencyFormat": "$",
      "currencyId": "USD",
      "price": 99.99,
      "tax": 12.5,
      "photo": "/assets/images/axedeo.png"
    }}
  ]
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping cart test</title>
        <meta name="description" content="Shopping cart test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        Shopping cart test
        </h1>
        <div className={styles.cart}>
          <Cart />
        </div>
        <div className={styles.products}>
          <Products items={productData} />
        </div>
        
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export default Home
