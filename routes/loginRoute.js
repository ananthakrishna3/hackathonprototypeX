require('dotenv/config');
const express = require('express')
const router = express.Router()
const {pool} = require('../dbConfig')
const bodyParser = require('body-parser')
const loginController = require('../controllers/loginController')
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())
const session = require('express-session')


function checkToken(req,res,next){
    //get authcookie from request

    const authcookie=req.cookies.authcookie
    const email=req.cookies.email
    console.log(email)
    console.log(authcookie)

    //verify token which is in cookie value
    jwt.verify(authcookie,"sfhsfhsfhfsiofhiosghiogjiogjdoghfioghioghfodiofghdfiogh",(err,data)=>{
        if(err){
            res.sendStatus(403)
        }
        else {
           req.user=data;//Set the decoded data in the req.user object
           next();
            
        }
    })
}


router.get('/users/login',(req,res)=>{
    res.render('login')
})

router.post('/users/checkmember',async (req,res)=>{
    const {email,pass} = req.body
    const loginDATA = await loginController.loginCheck(req,res)
}
    
)








module.exports = router