import {
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql'

import {Category} from '../backend/client/category'
import {getJson, resolveById, resolveList} from "./schema-utils";
import {findOrdersByLineItemCategory} from "./impl";
import {LineItem} from "../backend/client/order";

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    description: 'Category type',
    fields: {
        id: {
            description: 'Primary key',
            type: GraphQLID
        },
        name: {
            description: 'User-visible category name',
            type: GraphQLString
        }
    }
})

const TrackingInfoType = new GraphQLObjectType({
    name: 'TrackingInfo',
    description: 'Tracking information',
    fields: {
        carrier: {
            description: 'Shipping carrier name',
            type: GraphQLString
        },
        deliveryDate: {
            description: 'Scheduled delivery date',
            type: GraphQLString
        }
    }
})

const LineItemType = new GraphQLObjectType({
    name: 'LineItem',
    description: 'Order line item',
    fields: {
        product: {
            description: 'Product name',
            type: GraphQLString
        },
        price: {
            description: 'Item price',
            type: GraphQLFloat
        },
        quantity: {
            description: 'Quantity',
            type: GraphQLInt
        },
        category: {
            description: 'Product category in Product Catalog',
            type: CategoryType,
            resolve: (item: LineItem) => getJson(`category/${item.categoryId}/`)
        }
    }
})

const OrderType = new GraphQLObjectType({
    name: 'Order',
    description: 'Order type',
    fields: {
        id: {
            description: 'Primary key',
            type: GraphQLID
        },
        orderDate: {
            description: 'Date order placed',
            type: GraphQLString
        },
        items: {
            description: 'Line items ordered',
            type: new GraphQLList(LineItemType)
        },
        tracking: {
            description: 'Tracking information, available once order is shipped',
            type: TrackingInfoType
        }
    }
})

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'OrderTrackingApp',
        description: 'Order Tracking - Digital Assistant - GraphQL API',
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
