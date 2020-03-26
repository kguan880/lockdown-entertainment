const express = require('express')
const data = require('../data.json')

const router = express.Router()

router.get('/', (req,res)=>{
  const template = 'home'
  console.log('homepage')
  res.render(template)
}) 

module.exports = router