const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('You can see all available promotions');
})
.post((req, res, next) => {
    res.end('You add new promotion!')
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Updating operation does not available!');
})
.delete((req, res, next) => {
    res.end('All promotions was deleted!')
})

promoRouter.route('/:promoId')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('You can see current promotion: ' + req.params.promoId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('You can not add new promotion!')
})
.put((req, res, next) => {
    res.end('Updating operation on promotion number '+ req.params.promoId +' does not available!');
})
.delete((req, res, next) => {
    res.end('Promotion ' + req.params.promoId + ' was deleted!')
})

module.exports = promoRouter;