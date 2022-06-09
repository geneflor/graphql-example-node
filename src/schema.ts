import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID, GraphQLList, GraphQLFieldResolver
} from 'graphql'

import fetch from 'node-fetch'
import { Employee } from "./hrdb"

const HRDB_URL = 'http://localhost:3000'

type TArgs = { [argName: string]: any }

const getJson = (path: string) => fetch(`${HRDB_URL}/${path}`).then(res => res.json())

const resolveById = (res: string) => (root: any, args: TArgs) => getJson(`${res}/${args.id}/`)

const resolveList = (res: string) => () => getJson(`${res}/`)

const DepartmentType = new GraphQLObjectType({
    name: 'Department',
    description: 'Department Object Type',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
    }
})

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'Employee Object Type',
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        email: { type: GraphQLString },
        department: {
            type: DepartmentType,
            resolve: (employee: Employee) => getJson(`dept/${employee.department}/`)
        }
    }
})

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'QueryEmployees',
        description: 'My description',
        fields: {
            employeeById: {
                type: EmployeeType,
                args: { id: { type: GraphQLID } },
                resolve: resolveById("emp")
            },
            employees: {
                type: GraphQLList(EmployeeType),
                resolve: resolveList("emp")
            },
            departmentById: {
                type: DepartmentType,
                args: { id: { type: GraphQLID } },
                resolve: resolveById("dept")
            },
            departments: {
                type: GraphQLList(DepartmentType),
                resolve: resolveList("dept")
            }
        }
    })
})
