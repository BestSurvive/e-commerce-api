var express = require('express');
var user=require('./routes/user_api');
var admin=require('./routes/admin_api')
var app= express ();
app.use('/users',user);
app.use('/admin',admin);

app.listen(3001);
module.exports=app;
