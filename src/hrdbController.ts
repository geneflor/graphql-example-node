import * as db from './hrdb.js';
import { RequestHandler } from 'express';

// const list = (f: () => any) => (request: Request, response: Response) => {
//     response.status(200).json(f());
// }

export const getDepartments: RequestHandler = (request, response) => {
    const result = db.getDepartments();

    response.status(200).json(result);
}

export const getDepartmentById: RequestHandler = (request, response) => {
    const id = parseInt(request.params.id);
    const result = db.getDepartmentById(id);

    response.status(200).json(result);
}

export const getEmployees: RequestHandler = (request, response) => {
    const result = db.getEmployees();

    response.status(200).json(result);
}

export const getEmployeeById: RequestHandler = (request, response) => {
    const id = parseInt(request.params.id);
    const result = db.getEmployeeById(id);

    response.status(200).json(result);
}

