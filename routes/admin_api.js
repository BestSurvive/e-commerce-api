var express = require('express');
var admin= express.Router();
var bodyParser = require('body-parser');
admin.use(bodyParser.json());
admin.use(bodyParser.urlencoded({extended: true}));

var lib= require('e-commerce-api');

var validToken= function(req,res,next) {
  var token=req.query.token;
  if(token==="Admin")
  {
    next();
  }else res.status(401).json("Invalid Token");
}

var validId= function (req,res,next) {
    var cond=true;
    for (var i = 0; i < lib.products.length; i++) {
        if(req.params.id===lib.products[i].id)
        {
          cond=true;
          i=lib.products.length;
        }else cond=false;

      }
      if (cond===true) {
       next();
     }else res.status(404).json("Invalid ID");

    }


admin.get('/buyed',validToken, function(req,res) { res.status(200).json(lib.buyed); });

admin.get('/buyed/:user',validToken, function(req,res) {
  var buytemp=[];
  for (var i = 0; i < lib.buyed.length; i++){
    if(req.params.user===lib.buyed[i].user) {
      buytemp.push(lib.buyed[i]);
    }
  }
      res.status(200).json(buytemp);
});

admin.delete('/del/:id', validToken, validId,function(req,res) {
    res.status(200).json(lib.del(lib.products,req.params.id));
});

admin.post('/add', validToken, function(req,res){
  if(req.body.product===undefined && req.body.amount===undefined) {
    res.status(200).json(lib.add(lib.products,"undefined",0));
  }else if (req.body.product===undefined){
    res.status(200).json(lib.add(lib.products,"undefined", req.body.amount));
  }else if (req.body.amount===undefined){
    res.status(200).json(lib.add(lib.products, req.body.product, 0));
  }else res.status(200).json(lib.add(lib.products, req.body.product, req.body.amount));
});

admin.put('/up/:id', validToken, validId, function(req,res){
  if (req.body.product===undefined || req.body.amount===undefined) {
    res.status(403).json("Invalid Put, update product and amount");
  }else res.status(200).json(lib.up(lib.products,req.params.id,req.body.product,req.body.amount));
});



module.exports=admin;
