module.exports = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://mongodb:27017/twitter",
  PORT: process.env.PORT || 4000,
  SECRET: process.env.SECRET || "TOP_SECRET",
};
