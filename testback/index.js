const express = require('express')

const app = express()

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/login', (req, res) => res.send('You are Logged In'))
app.get('/signout', (req, res) => res.send('You are Logged Out'))
app.get('/name', (req, res) => res.send('Your name is Zaime'))

app.listen(port, () => console.log(`Listening on Port ${ port }`))