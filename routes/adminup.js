var express= require('express')
var router= express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assignment');

var adminSchema=mongoose.Schema({
name: String,
password: String
});

var Admin=mongoose.model("Admin",adminSchema);

router.get('/account/adsignup',function(req,res,next){
res.render('adminup',{name:'Username',pass:'Password'});
});

router.post('/account/adsignup',function(req,res,next){
var info=req.body;
var t=4
if(!info.uname||!info.pass)
res.render('errors');
else{

var newAdmin= new Admin({
name: info.uname,
password: info.pass
});

newAdmin.save(function(err,Admindetails){
if(err)
res.render("errors");
else
res.render("success",{t});
});

}
});



router.post('/account/admin',function(req,res,next){
var info=req.body;

if(!info.uname||!info.pass)
res.render('errors');
else{
var admincheck=Admin.findOne({name: info.uname,password: info.pass}).exec((err,admincheck)=>{
if(admincheck==undefined)
res.render('errors');
else
res.render('admin');
});
}
});

module.exports=router;

