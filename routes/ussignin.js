var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assignment');


var custSchema=mongoose.Schema({
name: String,
password: String,
status: String
});

var customers=mongoose.model("Customers",custSchema);




var Bill=function(name,price,quantity,total){
this.name = name,
this.price = price,
this.quantity = quantity,
this.total = total
};

var billList=[];

var Item=mongoose.model("Item");

router.get('/account/ussignin/order', function(req, res, next) {
  res.render('addlist',{name: 'Item Id',quan: 'Quantity'})
});

router.post('/account/ussignin/order',function(req,res,next){
var t = 1;
var iteminfo = req.body
var quan=iteminfo.quan
if(!iteminfo.id||!iteminfo.quan)
res.render('errors');
else{
Item.findById({_id: iteminfo.id}).exec((err,item)=>{

if(item==undefined)
res.render('errors');
else if(item.quantity<=0||iteminfo.quan>item.quantity||iteminfo.quan<=0)
res.render('outofstock');

else{
Item.findOneAndUpdate({_id: iteminfo.id},{$inc: {quantity: -1*(quan)}}).exec((err,items)=>{

if(items==undefined)
res.render('errors');
else{
billList.push(new Bill(items.name,items.price,quan,items.price*quan));
res.render('success',{t});
}
});

}

});
}
})



router.get('/account/ussignin/bill',function(req,res){
var total=0

billList.forEach(function(item){
total=total+item.total
});
var totals=total.toString()
res.render('showbill',{billList,totals});

})




router.get('/account/ussignin', function(req, res, next) {
  res.render('ussignin',{name: 'Username',pass: 'Password'})
});

router.post('/account/ussignin', function(req,res,next){

var info=req.body;

if(!info.uname||!info.pass)
res.render('errors');
else{
var custcheck=customers.findOne({name: info.uname,password: info.pass}).exec((err,custcheck)=>{
if(custcheck==undefined)
res.render('errors');
else if(custcheck.status=="disabled")
res.render('disabled');
else{
billList=[]
res.render('customerin');
}
});
}

});

module.exports = router;

