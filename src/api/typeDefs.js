const { gql } = require("apollo-server-express");

module.exports = gql`
  type Tweet {
    id: String
    author: String
    message: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getTweet(id: String): Tweet
    getTweets: [Tweet]
  }

  type Mutation {
    createTweet(message: String): Tweet
    deleteTweet(id: String): Tweet
    editTweet(id: String, message: String): Tweet
  }
`;
