require('dotenv/config');
const express = require('express')
const router = express.Router()
const {pool} = require('../dbConfig')
const bodyParser = require('body-parser')
const registerController = require('../controllers/registerController');
const session = require('express-session');
const flash = require('express-flash');
router.use(express.urlencoded({extended:false}))
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.use(
    session({
        secret:"secret",
        resave:false,
        saveUninitialized:false
}))
router.use(flash())

router.get('/users/register',(req,res)=>{
    res.render('register')
})

router.post('/users/addnewuser',async (req,res)=>{
    const {username,email,pass,pass2} = req.body
    const data = await registerController.registration(req,res)
    console.log(data)
    // res.setHeader('ejs','register')
})

module.exports = router