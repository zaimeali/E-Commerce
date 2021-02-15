const express = require('express')

const app = express()

const port = 3000

app.get('/nice', (req, res) => res.send('Nice'))

app.listen(port, () => console.log("Real Backend Server is up and running"))