const mongodb = require('mongoose');
const express = require('express');
const route = express.Router();

//MongoDB Product Schema
const Product = require('../models/product');

//Get Products Routes
route.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then((products) => {
        console.log(products);
        res.status(200).json(products);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

route.post('/', (req, res, next) => {
    let product = new Product({
        _id: new mongodb.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc
    });

    product.save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

    res.status(201).json({
        product: product
    });
});

route.put('/', (req, res, next) => {

});

route.delete('/:productid', (req, res, next) => {
    let id = req.params.productid;

    Product.remove({ _id: id })
    .exec()
    .then(res => {
        res.status(200).json({ message: "Produkt borttagen" });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err, message: "Nu gick något åt skogen!" })
    });
});


route.patch('/:productId',(req, res, next) => {
    const id = req.params.productId;
    const updateOps = { name:req.body.name, desc: req.body.desc};
     Product.update({ _id : id }, { $set : updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
            error: err
    });
});
})

//Export - Make Public
module.exports = route;
