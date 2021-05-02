const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const passport = require('passport');

require('./auth/auth');
require('./db/db');

const routes = require('./api/auth');
const typeDefs = require("./api/typeDefs")
const resolvers = require("./api/resolvers")

const server = new ApolloServer({
  typeDefs, resolvers, context: ({ req }) => {
    return { user: req.user }
  }
});

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);


app.use("/graphql", passport.authenticate('jwt', { session: false }))

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`server running on port: 4000`)
});