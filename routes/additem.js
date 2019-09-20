var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assignment');

var itemSchema=mongoose.Schema({
name: String,
price: Number,
quantity: Number
});

var Item=mongoose.model("Item",itemSchema);


router.get('/account/admin/additem', function(req, res, next) {
  res.render('additem',{name: 'Item Name',quan: 'quantity',price: 'Price'})
});

router.post('/account/admin/additem',function(req,res,next){
var iteminfo = req.body
var t=3
if(!iteminfo.uname||!iteminfo.price||!iteminfo.quantity)
res.render('errors');
else{
var newItem= new Item({
name: iteminfo.uname,
price: iteminfo.price,
quantity: iteminfo.quantity
})

newItem.save(function(err,itemDetails){
if(err)
res.render('errors')
else
res.render('success',{t})
})
}
})

module.exports=router

