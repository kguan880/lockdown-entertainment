const data = require('../data.json')
const express = require('express')
const readFile = require('../readFile')
const fs = require('fs')

const router = express.Router()

router.get('/', (req,res) => {
  readFile.openVideo((err,data)=>{
    if(err) throw err;
    const template = './partials/index'
    const viewData = {
      video: data.video
    }
    res.render(template, viewData)
  })
})

router.get('/addVideo', (req,res)=>{
  const template = "./partials/addVideo"
  res.render(template)
})

router.post('/addVideo', (req,res)=>{
  const template = "/container/"

  const newVideo = {
    id: null,
    name: req.body.name,
    user: req.body.user,
    userImage: req.body.userImage,
    artist: req.body.artist,
    genre: req.body.genre,
    detail: req.body.detail,
    thumbnail: req.body.thumbnail,
    link: req.body.link,
    yourname: "",
    comment: "",
    like: "",
  }

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if(err) throw(err)
    let obj = JSON.parse(data)
    //write data to obj
    newVideo.id = obj.video.length + 1
    obj.video.push(newVideo)
    const json = JSON.stringify(obj, null, 2)

    fs.writeFile('./data.json', json, (err, data) =>{
      if(err) throw err
      console.log('Data updated')
      res.redirect(template)
    })
  })
})

router.get('/:id', (req, res) => {
readFile.openVideo((err,data) =>{
  if(err) throw err;
  
  const id = req.params.id 
  const videoArray = data.video.find(item => item.id == id)
  
  const viewData = {
    name: videoArray.name,
    user: videoArray.user,
    userImage: videoArray.userImage,
    artist: videoArray.artist,
    genre: videoArray.genre,
    like: videoArray.like,
    detail: videoArray.detail,
    link: videoArray.link,
    id: videoArray.id,
    yourname: videoArray.yourname,
    comment: videoArray.comment
  }

  const template ='./partials/video'
  res.render(template, viewData)
  })
})

router.post('/:id', (req,res)=>{
  const template = '/container/'
  const id = req.params.id
  const videoArray = data.video.find(item => item.id == id)
  const newComment = {
    id: parseInt(id),
    yourname: req.body.yourname,
    comment: req.body.comment
  }
  videoArray.yourname = newComment.yourname
  videoArray.comment = newComment.comment
  console.log(newComment)
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err)=>{
    if(err) throw err
    res.redirect(template + newComment.id)
  })
})

router.get('/editVideo/:id' , (req,res)=>{
  readFile.openVideo((err,data)=>{
    if(err) throw err;
    const template = 'partials/editVideo'
    const videoArray = data.video.find(item => item.id == req.params.id)
    const viewData = {
      name: videoArray.name,
      user: videoArray.user,
      userImage: videoArray.userImage,
      artist: videoArray.artist,
      genre: videoArray.genre,
      like: videoArray.like,
      detail: videoArray.detail,
      link: videoArray.link,
      id: videoArray.id
    }
    res.render(template, viewData)
  })
})

router.post('/editVideo/:id', (req,res)=>{
  const template = "/container/"
  const video = data.video.find(item => item.id == req.params.id)
  const newData = req.body
  newData.id = parseInt(req.params.id)
  data.video.splice(req.params.id -1, 1, newData)

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err)=>{
    if(err) throw err
    res.redirect(template + video.id)
  })
})
module.exports = router;

