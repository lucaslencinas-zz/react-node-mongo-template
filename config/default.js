const ENV = process.env.NODE_ENV || 'development';

// server configuration
const config = {
  env: ENV,
  uri: {
    hostname: process.env.HOSTNAME || '0.0.0.0',
    port: process.env.PORT || 3000
  },
  api: {
    baseUri: '/api/v1'
  },
  database: {
    url: '0.0.0.0',
    port: 27017,
    name: 'games',
    connectionString() {
      return `mongodb://${this.url}:${this.port}/${this.name}`;
    }
  }
};

// client configuration
const clientConfig = {
  api: {
    hostname: config.uri.hostname,
    port: config.uri.port,
    pathname: config.api.baseUri
  }
};

config.client = clientConfig;

module.exports = config;
