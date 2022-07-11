import fetch from 'node-fetch'

const REST_URL = 'http://localhost:3000'

export type TArgs = { [argName: string]: any }

export const getJson = (path: string) => fetch(`${REST_URL}/${path}`).then(res => res.json())

export const resolveById = (res: string) => (root: any, args: TArgs) => getJson(`${res}/${args.id}/`)

export const resolveList = (res: string) => () => getJson(`${res}/`)
