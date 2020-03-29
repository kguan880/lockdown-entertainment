const fs = require('fs')

function openVideo(callback){
  fs.readFile('./data.json', 'utf-8', (err,data)=>{
    if (err) throw err;
    let obj = JSON.parse(data)
    callback(err,obj)
  })
}

module.exports = {
  openVideo
}