var express = require('express');
var path = require('path');
var logger = require('morgan');
const HandleUplaodFile = require('receive-slice-file-combin')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/uploadFile', (req, res) => {
  const fileUid = req.headers['file-uid'];
  const fileIndex = req.headers['file-index'];
  const isLast = req.headers['upload-end'] === 'isLast'
  const handle = new HandleUplaodFile({ catchDir: './public/catch', uploadDir: './public/upload', uid: fileUid, index: fileIndex });
  handle.parse(req, isLast, (err, file, filename) => {
    if(err) return console.log(err);
    const respJson = { success: true, file }
    isLast && (respJson.url = `http://localhost:5000/upload/` + filename)
    res.json(respJson)
  })
})


module.exports = app;
