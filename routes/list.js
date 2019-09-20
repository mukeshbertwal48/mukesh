var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assignment');
var item=mongoose.model("Item");


router.get('/account/ussignin/list',function(req,res,next){

var itemlist=item.find({}).exec((err,itemlis)=>{
res.render('show',{itemlis});

})


})

module.exports=router

