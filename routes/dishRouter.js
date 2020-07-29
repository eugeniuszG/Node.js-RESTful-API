const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) =>{
    res.statusCode = 200;

    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req,res, next) =>{
    res.end('Will send all dishes to you!');
})

.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported yet');
})

.delete((req,res, next) =>{
    res.end('Delete all the dishes information!');
});

dishRouter.route('/:dishId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next()
})
.get((req,res, next) =>{
    res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
})
.post((req, res, next) => {
    res.end('Creating the dish: ' + req.params.dishId);
})
.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId);
    res.end('Will update dish ' + req.body.name + ' with details ' + req.body.description);
})
.delete((req,res, next) =>{
    res.end('Delete the dish: ' + req.body.dishId);
});


module.exports = dishRouter;