const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const {Auth} = require('./utils/common')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    console.log(Auth.verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhYmNmQHd5ci5vcGoiLCJpYXQiOjE2ODU3MDI1OTEsImV4cCI6MTY4NTcwNjE5MX0.MACjW0ZyFHqIzuQRqpSLdRWXbqtxCDhhb4IKw7bt3IU"));
});
