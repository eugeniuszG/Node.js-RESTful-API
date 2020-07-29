const express = require('express');
const bodyParser = require('body-parser');

const leadersRouter = express();

leadersRouter.use(bodyParser.json());

leadersRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('You can see all available leaders');
})
.post((req, res, next) => {
    res.end('You can not add new leader!')
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Updating leaders option does not available!');
})
.delete((req, res, next) => {
    res.end('All leaders was deleted!')
})

leadersRouter.route('/:leaderId')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('You can see current leader: ' + req.params.leaderId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`You add new a new leader with name ${req.body.name} and id ${req.params.leaderId}`)
})
.put((req, res, next) => {
    res.end(`Updating operation on leader ${req.params.leaderId} with name ${req.body.name} and ${req.body.description} does not available!`);
})
.delete((req, res, next) => {
    res.end('Leader ' + req.params.leaderId + ' was deleted!')
})

module.exports = leadersRouter;