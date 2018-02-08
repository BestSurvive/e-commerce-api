var express = require('express');
var user= express.Router();
var lib= require('e-commerce-api');

user.get('/products', function(req,res) {
  res.status(200).json(lib.products);
});

user.get('/:user/:idp',
  function(req,res,next) {
    var token=req.query.token;
    if(token==="Pippo" || token==="Caio" || token==="Sempronio")
    {
      next();
    }else res.status(401).json("Invalid Token");
  },
  function (req,res,next) {
      var cond=true;
      for (var i = 0; i < lib.products.length; i++) {
          if(req.params.idp===lib.products[i].id)
          {
            cond=true;
            i=lib.products.length;
          }else cond=false;

        }
        if (cond===true) {
         next();
       }else res.status(404).json("Invalid ID");
     },
     function(req,res) {
       res.status(200).json({buy: lib.buy(lib.buyed,lib.products,req.params.idp,req.params.user)});
     }
);



module.exports=user;
