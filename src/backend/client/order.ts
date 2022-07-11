export type TrackingInfo = {
    carrier: string;
    deliveryDate: string;
}

export type Order = {
    id: number;
    categoryId: number;
    orderDate: string;
    tracking: TrackingInfo;
}
