import {orders} from "./oms-db";

export const getOrders =
    () => orders;

export const getOrderById =
    (id: number) => orders.find(d => d.id === id);
