const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongoose');
const app = express();

//Connect to (local)MongoDB
mongodb.connect('mongodb://localhost/dbtest');

//CORS Error Handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

//Export - Make Public
module.exports = app;