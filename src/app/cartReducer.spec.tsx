
import { priceFormat, cartUpdate, inCart } from './cartReducer';
import { appConfig } from '../config/appConfig';
describe("cartReducer with jest", ()=>{
  it("Test priceFormat function", ()=>{
    const testCases = [
      {
        "number": 0.565,
        "expect": 0.57
      },
      {
        "number": 0.5649,
        "expect": 0.56
      },
      {
        "number": 0,
        "expect": 0
      }
    ];
    testCases.forEach((item: any, index: number)=>{
      expect((priceFormat(item.number) === item.expect)).toBeTruthy();
    })
  });

  it("Test cartUpdate function", ()=>{
    const testCases = [
      {
        "items": [
        {
          "id": '0',
          "product": {
            "id": "0",
            "sku": "sku0",
            "title": "Dove Soap",
            "currencyFormat": "$",
            "currencyId": "USD",
            "price": 39.99,
            "tax": 12.5,
            "photo": "/assets/images/dovesoap.png"
          },
          "quantity": 1
        }
      ],
      "expect": {
        "totalItems": 1,
        "totalPrice": priceFormat(39.99 + appConfig.salesTax*39.99/100),
        "salesTax": priceFormat(appConfig.salesTax*39.99/100)
      }
    },
    {
      "items": [
      {
        "id": '0',
        "product": {
          "id": "0",
          "sku": "sku0",
          "title": "Dove Soap",
          "currencyFormat": "$",
          "currencyId": "USD",
          "price": 39.99,
          "tax": 12.5,
          "photo": "/assets/images/dovesoap.png"
        },
        "quantity": 1
      },
      {
        "id": '0',
        "product": {
          "id": "0",
          "sku": "sku0",
          "title": "Dove Soap",
          "currencyFormat": "$",
          "currencyId": "USD",
          "price": 39.99,
          "tax": 12.5,
          "photo": "/assets/images/dovesoap.png"
        },
        "quantity": 1
      },
      {
        "id": '0',
        "product": {
          "id": "0",
          "sku": "sku0",
          "title": "Dove Soap",
          "currencyFormat": "$",
          "currencyId": "USD",
          "price": 39.99,
          "tax": 12.5,
          "photo": "/assets/images/dovesoap.png"
        },
        "quantity": 1
      },
      {
        "id": '0',
        "product": {
          "id": "0",
          "sku": "sku0",
          "title": "Dove Soap",
          "currencyFormat": "$",
          "currencyId": "USD",
          "price": 39.99,
          "tax": 12.5,
          "photo": "/assets/images/dovesoap.png"
        },
        "quantity": 1
      },
      {
        "id": '0',
        "product": {
          "id": "0",
          "sku": "sku0",
          "title": "Dove Soap",
          "currencyFormat": "$",
          "currencyId": "USD",
          "price": 39.99,
          "tax": 12.5,
          "photo": "/assets/images/dovesoap.png"
        },
        "quantity": 1
      }
    ],
    "expect": {
      "totalItems": 5,
      "totalPrice": priceFormat(39.99*5+ appConfig.salesTax*5*39.99/100),
      "salesTax": priceFormat(appConfig.salesTax*5*39.99/100)
    }
  }
    ]
    testCases.forEach((testItem: any, index: number)=>{
      const updatedCart = cartUpdate(testItem.items); 
      expect((updatedCart.totalPrice === testItem.expect.totalPrice && updatedCart.totalItems === testItem.expect.totalItems)).toBeTruthy();
    })
  });
  it("Test inCart function", ()=>{
    const testCases = [
      {
        "items": [
        {
          "id": 'sku0',
          "product": {
            "id": "0",
            "sku": "sku0",
            "title": "Dove Soap",
            "currencyFormat": "$",
            "currencyId": "USD",
            "price": 39.99,
            "tax": 12.5,
            "photo": "/assets/images/dovesoap.png"
          },
          "quantity": 1
        }
      ],
      "product": {
        "id": "sku0",
        "sku": "sku0",
        "title": "Dove Soap",
        "currencyFormat": "$",
        "currencyId": "USD",
        "price": 39.99,
        "tax": 12.5,
        "photo": "/assets/images/dovesoap.png"
      },
      "expect": {
        "id": 'sku0',
        "product": {
          "id": "0",
          "sku": "sku0",
          "title": "Dove Soap",
          "currencyFormat": "$",
          "currencyId": "USD",
          "price": 39.99,
          "tax": 12.5,
          "photo": "/assets/images/dovesoap.png"
        },
        "quantity": 1
      }
    },
    {
      "items": [
      {
        "id": 'sku0',
        "product": {
          "id": "0",
          "sku": "sku0",
          "title": "Dove Soap",
          "currencyFormat": "$",
          "currencyId": "USD",
          "price": 39.99,
          "tax": 12.5,
          "photo": "/assets/images/dovesoap.png"
        },
        "quantity": 5
      },
      
    ],
    "product": {
      "id": "1",
      "sku": "sku1",
      "title": "Axe Deo",
      "currencyFormat": "$",
      "currencyId": "USD",
      "price": 99.99,
      "tax": 12.5,
      "photo": "/assets/images/axedeo.png"
    },
    "expect": false
  }
    ]
    testCases.forEach((testItem: any, index: number)=>{
      const foundProduct = inCart(testItem.product, testItem.items); 
      if( !testItem.expect ){
        expect(foundProduct).toBe(testItem.expect);
      }
      else{
        expect(foundProduct).toMatchObject(testItem.expect);
      }
    })
  });
});