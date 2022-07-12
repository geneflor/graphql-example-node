import fetch from 'node-fetch'
import {Order} from "../backend/client/order";

const REST_URL = 'http://localhost:3000'

export type TArgs = { [argName: string]: any }

export function getJson(path: string) {
    return fetch(`${REST_URL}/${path}`).then(res => res.json())
}

export function resolveList(res: string) {
    return () => getJson(`${res}/`);
}

export async function asyncFilter<T>(array: T[], predicate: (arg: T) => Promise<boolean>): Promise<T[]> {
    const result: T[] = [];

    for (const elem of array) {
        if (await predicate(elem)) {
            result.push(elem);
        }
    }

    return result;
}

export async function asyncContains<T>(array: T[], predicate: (arg: T) => Promise<boolean>): Promise<boolean> {
    for (const elem of array) {
        if (await predicate(elem)) {
            return true;
        }
    }

    return false;
}
