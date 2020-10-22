const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const promoRouter = express();
const Promos = require('../models/promotions');

promoRouter.use(bodyParser.json());

//working with all promos 
promoRouter.route('/')
.get((req, res, next) => {
    Promos.find({})
    .then(promos => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, err => next(err))
    .catch(err => next(err));

})
.post(authenticate.verifyUser,(req, res, next) => {
    Promos.create(req.body)
    .then(promo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, err => next(err))
    .catch(err => next(err))
    
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('Updating operation does not available!');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Promos.remove({})
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));
})


//working with particular promo
promoRouter.route('/:promoId')
.get((req, res, next) => {
    Promos.findById(req.params.promoId)
    .then(promo => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
    }, err => next(err))
    .catch(err => next(err));

})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation does not available!');
})
.put(authenticate.verifyUser,(req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {$set: req.body}, {new: true})
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, err => next(err))
    .catch(err => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Promos.findOneAndRemove(req.params.promoId)
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));
})

module.exports = promoRouter;