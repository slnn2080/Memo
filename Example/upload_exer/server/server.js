const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.post('/upload', multer({dest: 'upload'}).single('file'), (req, res) => {
  
  console.log(req.file)

  // fs.readFile(req.file.path, (err, data) => {
  //   if(!err) {
  //     let extname = req.file.mimetype.split('/')[1]
  //     let filename = Date.now()
  //     let fullName = filename + '.' + extname
  //     fs.writeFile(path.join(__dirname, '/public/upload/'+fullName), data, (err) => {
  //       if(!err) {
  //         let test = path.join(__dirname, './public/upload/'+fullName)
  //         console.log(test);
  //         res.send({err: 0, msg: '上传成功', data:'/upload/' + fullName})
  //       }
  //     })
  //   }
  // })

})

app.listen(8000, () => {
  console.log('服务器已开启，监听8000端口')
})