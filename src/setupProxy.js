const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/**',
    createProxyMiddleware({
      target: 'http://localhost:50500',
      secure: true,
      changeOrigin: true,
      ws: true,
      headers: {
        Host: '127.0.0.1:50500',
        Referer: 'http://127.0.0.1:50500',
        Origin: 'http://127.0.0.1:50500',
      }
    })
  );
};
