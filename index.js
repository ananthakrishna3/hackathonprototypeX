const express = require('express')
const {pool} = require('./dbConfig')
const app = express()
const PORT = process.env.PORT || 3000

const session = require('express-session')

app.use(
    session({
        secret:"secret",
        resave:false,
        saveUninitialized:false
}))

// setting up view engine
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

// routes
app.get('/',(req,res)=>{
    res.render('index')
})

app.use('/',require('./routes/registerRoute'))
app.use('/',require('./routes/loginRoute'))


app.get('/users/dashboard',(req,res)=>{
    res.render('dashboard',{user:'anantha'})
})


app.listen(PORT,()=>{console.log(`The app is running on port : ${PORT}`)})