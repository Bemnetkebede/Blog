const express = require('express')
const app = express()
const routes = require('./routes/index')

app.use('/', routes)

const port = process.env.PORT ||  5000
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})