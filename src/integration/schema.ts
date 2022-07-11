import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID, GraphQLList, GraphQLFieldResolver
} from 'graphql'

import fetch from 'node-fetch'

import { Category } from '../backend/client/category'

const REST_URL = 'http://localhost:3000'

type TArgs = { [argName: string]: any }

const getJson = (path: string) => fetch(`${REST_URL}/${path}`).then(res => res.json())

const resolveById = (res: string) => (root: any, args: TArgs) => getJson(`${res}/${args.id}/`)

const resolveList = (res: string) => () => getJson(`${res}/`)

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    description: 'Category Object Type',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    }
})

const TrackingInfoType = new GraphQLObjectType({
    name: 'TrackingInfo',
    description: 'Tracking Info Object Type',
    fields: {
        carrier: { type: GraphQLString },
        deliveryDate: { type: GraphQLString }
    }
})

const OrderType = new GraphQLObjectType({
    name: 'Order',
    description: 'Order Object Type',
    fields: {
        id: { type: GraphQLID },
        category: {
            type: CategoryType,
            resolve: (category: Category) => getJson(`category/${category.id}/`)
        },
        orderDate: { type: GraphQLString },
        tracking: {
            type: TrackingInfoType
        }
    }
})

let findOrdersByLineItemCategory = (root: any, args: TArgs) => [ getJson(`order/1/`) ];

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Queries',
        description: 'My description',
        fields: {
            orders: {
                type: GraphQLList(OrderType),
                resolve: resolveList("order")
            },

            orderByItemCategory: {
                description: "Retrieves recent orders by line item category",
                type: GraphQLList(OrderType),
                args: {
                    lineItemCategory: {
                        description: "A string matched to the category name of ordered items",
                        type: GraphQLString
                    }
                },
                resolve: findOrdersByLineItemCategory
            }
        }
    })
})
