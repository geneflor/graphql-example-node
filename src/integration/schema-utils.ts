import fetch from 'node-fetch'

const REST_URL = 'http://localhost:3000'

export type TArgs = { [argName: string]: any }

export function getJson(path: string) {
    return fetch(`${REST_URL}/${path}`).then(res => res.json())
}

export function resolveList(res: string) {
    return () => getJson(`${res}/`);
}
