const PROXY_CONFIG = [
  {
    context: ['/car/getJson.php'],
    target: {
      host: '122.117.66.231',
      protocol: 'http',
      port: 8080
    },
    secure: false,
    changeOrigin: true
  }
];
module.exports = PROXY_CONFIG;