import { RequestHandler, Request } from 'express';

export function handlerFactory(responseSupplier: (request: Request) => any): RequestHandler {
    return (request, response) => {
        response.status(200).json(responseSupplier(request));
    }
}
