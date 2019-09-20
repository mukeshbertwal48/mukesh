var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assignment');


var Customer=mongoose.model("Customer");


router.get('/account/admin/statuschange', function(req, res, next) {
  res.render('statuschange',{name: 'Customer name',sta: 'Status'})
});

router.post('/account/admin/statuschange',function(req,res,next){
var t=5
var info = req.body;

if(!info.uname||!info.status)
res.render('errors');
else{
var cust=Customer.findOneAndUpdate({name: info.uname},{$set: {"status": info.status}}).exec((err,customer)=>{

if(customer==undefined)
res.render('errors')
else
res.render('success',{t})

})

}

});

module.exports = router
