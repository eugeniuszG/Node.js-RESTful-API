const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dishRouter = express.Router();
const Dishes = require('../models/dishes');

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get( (req,res, next) =>{
    
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, err => next(err))
    .catch(err => next(err));
     
})

.post((req, res, next) => {

    Dishes.create(req.body)
    .then(dishes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, err => next(err))
    .catch(err => next(err));
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported yet');
})

.delete((req,res, next) =>{
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));

});



//Working wit specific dish!

dishRouter.route('/:dishId')
.get((req,res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    //res.end('Post operation is not support on /dishes/');
})
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new: true})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, err => next(err))
    .catch(err => next(err));
})
.delete((req,res, next) =>{
    Dishes.findOneAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));
});

//end 


//Secong part, where we working with comments in general

dishRouter.route('/:dishId/comments')
.get( (req,res, next) =>{
    
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }
        else{
            err = new Error(`Dish ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
     
})

.post((req, res, next) => {

    Dishes.findById(req.params.dishId)
    .then(dish => {
        if (dish != null) {
            
            dish.comments.push(req.body);
            dish.save()
            .then(dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })  
        }
        else{
            err = new Error(`Dish ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported yet');
})

.delete((req,res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null) {

            for (var i = (dish.comments.length -1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then(dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })  
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            
        }
    }, err => next(err))
    .catch(err => next(err));

});



//Working wit specific comment in the dish

dishRouter.route('/:dishId/comments/:commentId')
.get((req,res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null){
            err = new Error(`Dish ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        }
        else{
            err = new Error(`Comment ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation is not support on /dishes/ ' + req.params.commentId);
})
.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.raring;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment ;
            }
            dish.save()
            .then( dish => {
                res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
            }, err => next(err));

        }
        else if (dish == null){
            err = new Error(`Dish ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        }
        else{
            err = new Error(`Comment ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})
.delete((req,res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();

            dish.save()
            .then(dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })  
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            
        }
        else if (dish == null){
            err = new Error(`Dish ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        }
        else{
            err = new Error(`Comment ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = dishRouter;

