var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assignment');

var custSchema=mongoose.Schema({
name: String,
password: String,
status: String
});

var Customer=mongoose.model("Customer",custSchema);


router.get('/account/admin/addcust', function(req, res, next) {
  res.render('addcust',{name: 'Username',pass: 'Password',sta: 'Status'})
});

router.post('/account/admin/addcust',function(req,res,next){
var custinfo = req.body
var t=2
if(!custinfo.uname||!custinfo.pass||!custinfo.status)
res.render('errors');
else{

var newCust= new Customer({
name: custinfo.uname,
password: custinfo.pass,
status: custinfo.status
})

newCust.save(function(err,custDetails){
if(err)
res.render('errors')
else
res.render('success',{t})
})
}
})


module.exports = router;

