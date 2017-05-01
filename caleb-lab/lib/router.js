'use strict';

const debug = require('debug')('http:router');
const parseJson = require('./parse-json');
const parseQuery = require('./parse-url.js');

//this is a constructor.
//when instantiated it only has one property, which is routes,
//when we instantiate the router, we're going to have the prototype
//methods that will bind them to each object in the Router.routes property
const Router = module.exports = function (){
  debug('#Router');
  this.routes = {
    GET: {
      // '/': function(req,res){ do stuff};
    },
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

//the endpoint is the code that you'll tell the route to target, '/'
Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};



//let server = http.createServer(fn (req, res){
  //do stuff
//})
//below is an abstraction layer . all routes will be part of 'this' router instance

Router.prototype.route = function(){
  debug('#routes');
  return (req, res) => {
    Promise.all([
      parseQuery(req),
      parseJson(req),
    ]).then(() => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }

      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not found');
      res.end();
    }).catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
  };
};
