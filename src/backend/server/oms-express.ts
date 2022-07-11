import * as oms from './oms-api';
import {Express} from 'express';
import {handlerFactory} from "./express-utils";

const getOrders =
    handlerFactory(() => oms.getOrders())

const getOrderById =
    handlerFactory((request) => oms.getOrderById(parseInt(request.params.id)))

export const deploy = (rest: Express) => {
    rest.get('/order/', getOrders);
    rest.get('/order/:id', getOrderById);
}
