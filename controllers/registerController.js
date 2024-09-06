require('dotenv').config();
const express = require('express')
const { pool } = require('../dbConfig')
const bodyParser = require('body-parser')
const router = express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
router.use(express.urlencoded({ extended: false }))
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

module.exports.registration = async (req, res) => {
    try {
        console.log('authenticating user')
        let errors = []
        let { username, email, pass, pass2 } = req.body

        console.log({ username, email, pass, pass2 })

        const usernameArray = [username]
        const emailArray = [email]
        // const passArray = [pass]
        // const pass2Array = [pass2]

        //checking for errors in entered details
        if (!username || !email || !pass || !pass2) {
            errors.push({ message: 'please enter all the fields' })
        }
        if (pass.length && pass2.length < 6) {
            errors.push({ message: 'passwords should be atleast having 6 characters' })
        }
        if (pass != pass2) {
            errors.push({ message: 'enter same passwords' })
        }
        if (errors.length > 0) {
            res.render('register', { errors, username, email, pass, pass2 })
        }
        else {
            hashedPass = await bcrypt.hash(pass, 10)
            const hashedPassArray = [hashedPass]
            console.log(hashedPass)
            pool.query('SELECT * FROM users WHERE email = $1', [emailArray],
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(results.rows);

                    if (results.rows.length>0) {
                        return res.render('register', { "success_message": "email already registered!" })
                        
                    } else {
                        pool.query('insert into users(username,email,pass) values ($1,$2,$3)', [usernameArray, emailArray, hashedPassArray],
                            (err, results) => {
                                if (err) {
                                    console.log('error 1')
                                    throw err
                                }
                                console.log(errors.rows)
                                req.flash("success_message", "You are now registered. Please log in");
                                res.redirect("/users/login");
                            }
                        )
                    }
                }
            )
        }
    } catch (e) {
        console.log('registration errors', e)
    }
}
