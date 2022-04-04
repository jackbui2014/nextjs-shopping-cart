
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '../../app/store';
import { mount } from '../../../test/mount';
import userEvent from '@testing-library/user-event';
import {Products}  from './index';
import { Cart } from '../Cart';
import { appConfig } from '../../config/appConfig';
import { priceFormat } from '../../app/cartReducer';

describe("Products component testing with jest", ()=>{
  
  it("renders without crashing", ()=>{
    const component  = mount(<Products />);
    expect(component).toBeTruthy();
  });
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
    {
      "product": {
        "id": "1",
        "sku": "sku1",
        "title": "Axe Deo",
        "currencyFormat": "$",
        "currencyId": "USD",
        "price": 99.99,
        "tax": 12.5,
        "photo": "/assets/images/axedeo.png"
      }
    }
  ];
  it('renders 2 product items', ()=>{
    mount(<Products items={productData} />); 
    expect(screen.getByText('Dove Soap')).toBeInTheDocument();
  });
  it('Add 5 Dove Soaps to cart', async ()=>{

    const user = userEvent.setup();
    const { container } = mount(
      <>
      <Cart />
      <Products items={productData} />
      </>
    ); 
    const btnEl = container.querySelector('#add-to-cart-sku0');
    await user.click(btnEl);
    await user.click(btnEl);
    await user.click(btnEl);
    await user.click(btnEl);
    await user.click(btnEl);
    const product0 = productData[0].product;
    const expectSalesTax = priceFormat(product0.price*5*appConfig.salesTax/100);
    const expectTotalPrice = priceFormat(product0.price*5 + expectSalesTax);
    const totalItems = screen.getByTestId('cart_total_items');
    expect(totalItems.innerHTML).toBe('5');
    const totalPrice = screen.getByTestId('cart-total-price');
    expect(totalPrice.innerHTML).toBe(expectTotalPrice.toFixed(2));
    const salesTax = screen.getByTestId('cart-sales-tax');
    expect(salesTax.innerHTML).toBe(expectSalesTax.toFixed(2));
    
  });
  it('Add 8 Dove Soaps to cart', async ()=>{
    const user = userEvent.setup();
    const { container } = mount(
      <>
      <Cart />
      <Products items={productData} />
      </>
    ); 
    const product0 = productData[0].product;
    const expectSalesTax = product0.price*8*appConfig.salesTax/100;
    const expectTotalPrice = priceFormat(product0.price*8 + expectSalesTax);
    const btnEl = container.querySelector('#add-to-cart-sku0');
    await user.click(btnEl);
    await user.click(btnEl);
    await user.click(btnEl);
    const totalItems = screen.getByTestId('cart_total_items');
    expect(totalItems.innerHTML).toBe('8');
    const totalPrice = screen.getByTestId('cart-total-price');
    expect(totalPrice.innerHTML).toBe(expectTotalPrice.toFixed(2));
    const salesTax = screen.getByTestId('cart-sales-tax');
    expect(salesTax.innerHTML).toBe(expectSalesTax.toFixed(2));
    
  });
  it('Add 2 Dove Soaps and 2 Axe Deos to cart', async ()=>{
    const user = userEvent.setup();
    const store = makeStore();
    const container  = render(
      <Provider store={store}>
        <Cart />
        <Products items={productData} />
      </Provider>
    ); 
    const btnEl = screen.getByTestId('add-to-cart-sku0');
    await user.click(btnEl);
    await user.click(btnEl);
    const btnEl1 = screen.getByTestId('add-to-cart-sku1');
    await user.click(btnEl1);
    await user.click(btnEl1);
    const product0 = productData[0].product;
    const product1 = productData[1].product;
    const subPrice = product0.price*2 + product1.price*2;
    const expectSalesTax = priceFormat(subPrice*appConfig.salesTax/100);
    const expectTotalPrice = priceFormat(subPrice+expectSalesTax);
    const totalItems = screen.getByTestId('cart_total_items');
    expect(totalItems.innerHTML).toBe('4');
    const totalPrice = screen.getByTestId('cart-total-price');
    expect(totalPrice.innerHTML).toBe(expectTotalPrice.toFixed(2));
    const salesTax = screen.getByTestId('cart-sales-tax');
    expect(salesTax.innerHTML).toBe(expectSalesTax.toFixed(2));
    
  });

});