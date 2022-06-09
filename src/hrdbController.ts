import * as db from './hrdb.js';
import { RequestHandler, Request } from 'express';

function handlerFactory(responseSupplier: (request: Request) => any): RequestHandler {
    return (request, response) => {
        response.status(200).json(responseSupplier(request));
    }
}

export const getDepartments =
    handlerFactory(() => db.getDepartments())

export const getDepartmentById =
    handlerFactory((request) => db.getDepartmentById(parseInt(request.params.id)))

export const getEmployees =
    handlerFactory(() => db.getEmployees())

export const getEmployeeById =
    handlerFactory((request) => db.getEmployeeById(parseInt(request.params.id)))
