const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/users', createProxyMiddleware({
  target: 'http://localhost:4001',
  changeOrigin: true,
}));

app.use('/auth', createProxyMiddleware({
  target: 'http://localhost:5002',
  changeOrigin: true,
}));

app.listen(3000, () => console.log('API Gateway running on 3000'));
