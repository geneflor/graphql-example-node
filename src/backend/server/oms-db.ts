import {Order} from "../client/order";

export const orders: Order[] = [
    {
        id: 1387,
        orderDate: '07/01/2022',
        items: [
            { product: 'ORACLE graphic tee', price: 8.95, quantity: 1, categoryId: 2 },
            { product: 'Nike Air Structure Unisex Shoes', price: 120.00, quantity: 1, categoryId: 3 },
        ],
        tracking: {carrier: "UPS", deliveryDate: '07/12/2022'}
    },
    {
        id: 1388,
        orderDate: '07/02/2022',
        items: [
            {
                product: 'Lee Men\'s Performance Series Extreme Comfort Straight Fit Pant',
                quantity: 1,
                price: 31.90,
                categoryId: 1
            },
        ],
    },
    {
        id: 1389,
        orderDate: '07/03/2022',
        items: [
            { product: 'ORACLE coffee mug', price: 12.50, quantity: 4, categoryId: 3 },
        ],
        tracking: {carrier: "UPS", deliveryDate: '07/12/2022'}
    },
];
