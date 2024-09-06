require('dotenv').config();
const express = require('express')
const { pool } = require('../dbConfig')
const bodyParser = require('body-parser')
const router = express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const alert = require('alert-node')

router.use(express.urlencoded({ extended: false }))
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { cookie } = require('express/lib/response');


module.exports.loginCheck = async (req, res) => {
    try {
        console.log('Login authorization')
        const { email, pass } = req.body
        console.log({ email, pass })
        const properEmail = [email]
        const properPass = [pass]
        const stringifiedproperPass = (JSON.stringify(pass))
        console.log(pass)
        console.log(typeof(pass))


        if (email === 'aeroclubnitte@nmamit.in' && pass === 'aeroclub123') {
            console.log('Admin login successful')
            const token = jwt.sign({ email }, 'sfhsfhsfhfsiofhiosghiogjiogjdoghfioghioghfodiofghdfiogh')
            console.log(token)
            res.cookie('authcookie', token, { maxAge: 120 * 60 * 1000, httpOnly: true })
            res.cookie('email', email)
            res.redirect('/users/dashboard')
        } else {
            pool.query(
                `SELECT * FROM users WHERE email=$1`,
                [properEmail],
                async (err, results) => {
                    if (err) {
                        throw err
                    }
                    else {
                        // console.log(results)
                        if (results.rows.length > 0) {
                            const storedhashedPasswordArray = results.rows[0].pass
                            const hashedPassword = storedhashedPasswordArray[0]
                            const isPasswordMatch = await bcrypt.compare(pass, hashedPassword)
                            if (isPasswordMatch) {
                                alert('successful login')
                                console.log('successful user login')
                                const userEmail = results.rows[0].email
                                const token = jwt.sign({ email }, 'sfhsfhsfhfsiofhiosghiogjiogjdoghfioghioghfodiofghdfiogh')
                                console.log(token)
                                res.cookie('authcookie', token, { maxAge: 120 * 60 * 1000, httpOnly: true });
                                res.cookie('email', email)
                                res.redirect('/users/dashboard')
                            } else {
                                alert('Wrong credentials, try again! (Check your email or password)')
                                console.log('Wrong login credentials')
                                res.render('login')
                            }
                        } else {
                            alert('Please register first!')
                            console.log('user not found!!')
                            res.render('login')
                        }
                    }
                }
            )
        }

    } catch (error) {
        console.log('Login error', error)
    }
}
