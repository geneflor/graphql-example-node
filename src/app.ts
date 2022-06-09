import express from 'express';

import * as rest from './hrdbController.js';
import schema from './schema.js'
import {graphqlHTTP} from "express-graphql";
//
// REST API server
//
const hrdbApp = express();

hrdbApp.use(express.json());
hrdbApp.get('/dept/', rest.getDepartments);
hrdbApp.get('/dept/:id', rest.getDepartmentById);
hrdbApp.get('/emp/', rest.getEmployees);
hrdbApp.get('/emp/:id', rest.getEmployeeById);
hrdbApp.listen(3000, () => console.log('HRDB server is running on port 3000.'));
//
// GraphQL server
//
const gqlApp = express();

gqlApp.use(graphqlHTTP({ schema, graphiql: true }));

gqlApp.listen(3001, () => console.log('GraphQL server is running on port 3001.'));
