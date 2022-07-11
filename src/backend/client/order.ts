export type TrackingInfo = {
    carrier: string;
    deliveryDate: string;
}

export type LineItem = {
    product: string;
    quantity: number;
    price: number;
    categoryId: number;
}

export type Order = {
    id: number;
    orderDate: string;
    items: LineItem[];
    tracking?: TrackingInfo;
}
