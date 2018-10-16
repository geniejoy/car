const PROXY_CONFIG = [
    {
      context: ['/services/console/login'],
      target: {
        host: 'localhost',
        port: 6986,
        protocol: 'http:'
      },
      secure: false,
      changeOrigin: true
    },
    {
      context: ['/services/console/gql'],
      target: {
        host: 'localhost',
        protocol: 'http:',
        port: 6986
      },
      secure: false,
      changeOrigin: true
    },
    {
      context: ['/services/console/gqlsub'],
      target: {
        host: 'localhost',
        protocol: 'ws:',
        port: 6986
      },
      ws: true,
      secure: false,
      changeOrigin: true
    }
  ];
  module.exports = PROXY_CONFIG;