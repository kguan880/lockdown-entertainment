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
const videoArray = data.video.find(item => item.id == id)


const viewData = {
  name: obj.name,
  artist: obj.artist,
  genre: obj.genre,
  comment: obj.comment,
  link: obj.link,
  id: obj.id
}
}
const template =''
res.render(template, viewData)

})



/*potential refractoring idea
  
router.get('/comedy/:id', (req, res)=>{
  fs.readFile(comedyData, 'utf-8', (err,data)=>{
    if(err) throw err;
    let obj = JSON.parse(data)
    console.log('comedy videos')

    const id = req.params.id
    
    const comedyVids = data.comedy.find(video => video.id === id)

    const viewData = {
      name: comedy.name,
      artist: comedy.artist,
      genre: comedy.genre,
      comment: comedy.comment,
      id: comedy.id
    }

    const template = ''
    
    res.render(template, viewData)
  })
})

router.get('/misc/:id', (req, res)=>{
  fs.readFile(miscData, 'utf-8', (err,data)=>{
    if(err) throw err;
    let obj = JSON.parse(data)
    console.log('misc videos')

    const id = req.params.id
    
    const miscVids = data.misc.find(video => video.id === id)

    const viewData = {
      name: mics.name,
      artist: misc.artist,
      genre: misc.genre,
      comment: misc.comment,
      id: misc.id
    }

    const template = ''
    
    res.render(template, viewData)
  })
})

router.get('/music/:id', (req, res)=>{
  fs.readFile(musicData, 'utf-8', (err,data)=>{
    if(err) throw err;
    let obj = JSON.parse(data)
    console.log('music videos')

    const id = req.params.id
    
    const musicVids = data.music.find(video => video.id === id)

    const viewData = {
      name: music.name,
      artist: music.artist,
      genre: music.genre,
      comment: music.comment,
      id: music.id
    }

    const template = ''
    
    res.render(template, viewData)
  })
})
*/

module.exports = router;