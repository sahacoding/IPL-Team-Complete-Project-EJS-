const express = require ('express');
const router = express.Router();
const User = require ('../models/user');
const passport = require ('passport');

router.get('/register', (req, res) =>{
    res.render('userss/register')
})

router.post('/register', async (req, res) =>{
    try{
        const {email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
       // console.log(registeredUser);
       // req.flash('success', 'Welcome to Yelp Camp');
        res.redirect('/teamlist')
    }catch (e){
        // req.flash('error', e.message);
         res.redirect('/register')

    }
  
})

router.get('/login', (req, res) =>{
    res.render('userss/login')
   // res.send('Hlwwww')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) =>{
   // req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/teamlist'; 
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) =>{
    req.logout((err) =>{
        //console.log(err)
        req.flash('success', 'GoodBye');
        res.redirect('/teamlist')
    })
})

module.exports = router;