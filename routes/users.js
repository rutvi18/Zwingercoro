const express= require('express');

const router=express.Router();
const H_user = require('../models/H_user');

router.get('/register',function(req,res){
  res.render('register')
});
router.get('/login',function(req,res){
  res.render('login')
});

router.post('/register',(req,res)=>{
  const{fname,lname,address,email,pnum,password} =req.body;
  var data = {
      fname: fname,
      lname: lname,
      email:email,
      pnum:pnum,
      address:address,
      password:password


  }
  var newH_user= new H_user(data);
  newH_user.save((error)=> {
    if (error){
      console.log('there is error');

    }else{
      console.log('data has been saved');
    }

  });
  console.log(fname,address,email);
});

module.exports=router;
