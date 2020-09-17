const express = require('express');
const bodyParser = require('body-parser');

const leadersRouter = express();


const Leaders = require('../models/leaders');
leadersRouter.use(bodyParser.json());


//working with collections of leaders
leadersRouter.route('/')
.get((req, res, next) => {
    
    Leaders.find({})
    .then(leaders => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then(leaders => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Updating leaders option does not available!');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then(leaders => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, err => next(err))
    .catch(err => next(err));
})

//working with particular leader
leadersRouter.route('/:leaderId')
.get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
    .then(leader => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`You add new a new leader with name ${req.body.name} and id ${req.params.leaderId}`)
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {$set: req.body}, {new: true})
    .then(leader => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then(leader => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})

module.exports = leadersRouter;