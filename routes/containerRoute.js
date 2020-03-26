const express = require('express')
const data = require('../data.json')
const fs = require('fs')

const router = express.Router()

router.get('/', (req,res) => {
  fs.readFile('./data.json', 'utf-8', (err,data)=>{
    if(err) throw err;
    const template = "partials/index"
    let obj = JSON.parse(data)
    console.log(obj)
    console.log('container page')
    const viewData = {
      comedy: obj.comedy,
      music: obj.music,
      misc: obj.misc
    }
    res.render(template, viewData)
  })
})

module.exports = router;