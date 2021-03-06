const express= require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router=express.Router();
const H_user = require('../models/H_user');
const { forwardAuthenticated } = require('../config/auth');


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));



// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));


router.post('/register',(req,res)=>{
  const { fname,lname,address1,address2,city,state,pincode,email,pnum,password,password2} = req.body;
  let errors = [];

  if (!fname || !lname || !email || !password || !pnum ||  !password2 || !address1 || !address2 || !city || !state || !pincode) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (pincode.length != 6) {
    errors.push({ msg: 'Pin code is wrong' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      fname,
      lname,
      address1,
      address2,
      city,
      state,
      pincode,
      email,
      pnum,
      password,
      password2
    });
  } else {
    H_user.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          fname,
          lname,
          address1,
          address2,
          city,
          state,
          pincode,
          email,
          pnum,
          password,
          password2
        });
      } else {
        var newH_user= new H_user({
          fname,
          lname,
          address1,
          address2,
          city,
          state,
          pincode,
          email,
          pnum,
          password

        });


        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newH_user.password, salt, (err, hash) => {
            if (err) throw err;
            newH_user.password = hash;
            newH_user
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }


});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});
// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports=router;
