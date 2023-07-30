const express = require('express');
const rateLimit = require('express-rate-limit');
const { ServerConfig, Logger } = require('./config');
const apiRoutes = require('./routes');

const {Auth} = require('./utils/common');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 3
});

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(limiter);

app.use('/flightService', 
            createProxyMiddleware({target: 'http://localhost:3500', 
            changeOrigin: true,
            pathRewrite: {'^/flightService': '/'}}));

app.use('/bookingService', 
        createProxyMiddleware({target: 'http://localhost:3600', 
        changeOrigin: true,
        pathRewrite: {'^/bookingService': '/'}}));
        
app.use('/api', apiRoutes);

app.get('/home', (req, res) => {
    return res.json({message: "OK"});
});

app.listen(ServerConfig.PORT, () => {
    Logger.info(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
