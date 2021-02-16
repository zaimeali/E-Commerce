const express = require('express')

const app = express()

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/login', (req, res) => res.send('You are Logged In'))
app.get('/signout', (req, res) => res.send('You are Logged Out'))
app.get('/name', (req, res) => res.send('Your name is Zaime'))


const admin = (req, res) => {
    return res.send('Admin Dashboard')
}
// Admin Check Middleware
const isAdmin = (req, res, next) => {
    console.log("Admin Middleware")
    next()
}
// Logged In User Check Middleware
const isLoggedIn = (req, res, next) => {
    console.log("Is User Logged In")
    next()
}

app.get('/admin', isLoggedIn, isAdmin, admin)

app.listen(port, () => console.log(`Listening on Port ${ port }`))