const TweetModel = require('../model/tweet');

module.exports = {
    Query: {
        getTweet: async (_, { id }, ctx) => {
            return TweetModel.findOne({ id, author: ctx.user })
        },
        getTweets: async (_, __, ctx) => {
            return TweetModel.find({ author: ctx.user })
        },
    },
    Mutation: {
        createTweet: async (_, { message }, ctx) => {
            return TweetModel.create({ message, author: ctx.user })
        },
        deleteTweet: async (_, { id }, ctx) => {
            return TweetModel.deleteOne({ id, author: ctx.user })
        },
        editTweet: async (_, { id, message }, ctx) => {
            return TweetModel.findOneAndUpdate({ id, author: ctx.user }, { message }, { new: true })
        },
    }
}