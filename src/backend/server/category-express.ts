import * as cat from './category-api';
import {Express} from 'express';
import {handlerFactory} from "./express-utils";

const getCategories =
    handlerFactory(() => cat.getCategories())

const getCategoryById =
    handlerFactory((request) => cat.getCategoryById(parseInt(request.params.id)))

export const deploy = (rest: Express) => {
    rest.get('/category/', getCategories);
    rest.get('/category/:id', getCategoryById);
}
