import * as express from 'express';
import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { GraphQLOptions } from 'apollo-server-core';
import { execute, subscribe, GraphQLSchema } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { schema } from './schema';

const PORT = 3000;

const server = express();
server.use('*', cors({ origin: `http://localhost:${PORT}` }));
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema } as GraphQLOptions));
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

// Wrap the Express server
const ws = createServer(server);
ws.listen(PORT, () => {
  console.log(`Apollo Server is now running on http://localhost:${PORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema: schema as GraphQLSchema
  }, {
      server: ws,
      path: '/subscriptions',
    });
});