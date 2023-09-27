const express = require('express')
const app = express()

app.listen(3000, (req, res)=>{
    console.log('hello from auth folder')
})

app.get('/', (req, res)=>{
    res.send('hello from backend')
})