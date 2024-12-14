import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://16.170.247.41',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Optionally, rewrite the path if needed
      },
    })
  );
}