import express from 'express';
import schema from './schema.js'
import {graphqlHTTP} from "express-graphql";

const gqlPort = 3001;

const gqlApp = express();

gqlApp.use(graphqlHTTP({schema, graphiql: true}));

gqlApp.listen(gqlPort, () => console.log(`GraphQL server is running on http://localhost:${gqlPort}`));
