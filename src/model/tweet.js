const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const TweetSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    id: {
      type: String,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (_, ret) {
        delete ret.__v;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

TweetSchema.pre("save", function (next) {
  this.id = this._id;
  next();
});

const TweetModel = mongoose.model("tweet", TweetSchema);

module.exports = TweetModel;
