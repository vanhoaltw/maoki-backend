const environment = process.env.NODE_ENV;

const env = {
  environment,
  mongoUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t6yd2fp.mongodb.net/${environment}?retryWrites=true&w=majority`,
};

module.exports = { env };
