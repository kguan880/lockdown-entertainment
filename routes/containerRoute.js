const express = require('express')
const fs = require('fs')

const router = express.Router()

router.get('/', (req,res) => {
  //consider moving readFile to a function and pass to this function a callback
  //inside this function try using readfile on 1 file first and once you manage to return the data
  //try adding the next readfile
  fs.readFile("./data.json", 'utf-8', (err,data)=>{
    const template = './partials/index'
    if(err) throw err;
    let obj = JSON.parse(data)
    const viewData = {
      video: obj.video
    }
    res.render(template, viewData)
  })
})


router.get('/:id', (req, res) => {
 
  //readfile
fs.readFile("./data.json", 'utf-8', (err,data) =>{
  if(err) throw err;
  let obj = JSON.parse(data)
  
  const id = req.params.id 
  const videoArray = obj.video.find(item => item.id == id)
  
  const viewData = {
    name: videoArray.name,
    artist: videoArray.artist,
    genre: videoArray.genre,
    comment: videoArray.comment,
    link: videoArray.link,
    id: videoArray.id
  }

  const template ='./partials/video'
  res.render(template, viewData)

  })
})


module.exports = router;