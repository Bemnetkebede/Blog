const express = require('express')
const router = express.Router()

router.get('/name',(req,res)=>{
    res.status(200).send('Bemnet Kebede')
})

router.get('/hobby',(req,res)=>{
    res.status(200).json({hobby: 'Coding and watching Movie'})
})

router.get('/dream',(req,res)=>{
    res.status(200).send('Believe in yourself and chase your dreams!')
})

module.exports = router;