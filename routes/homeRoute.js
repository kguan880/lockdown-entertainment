const express = require('express')

const router = express.Router()

router.get('/', (req,res)=>{
  const template = 'home'
  console.log('homepage')
  res.render(template)
}) 

module.exports = router