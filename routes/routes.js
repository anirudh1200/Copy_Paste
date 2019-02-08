const express = require('express'),
      router = express.Router(),
      Paste = require('../models/paste'),
      fs = require('fs'),
      path = require('path');

router.get('/api/download', (req, res) => {
    Paste.find()
        .then(allPastes => res.json(allPastes))
        .catch(console.log);
});

router.post('/api/upload', (req, res) => {
    // Create a new file containing the data
    const filePath = path.resolve(__dirname + '/../files/', req.body.url + '.txt');
    fs.writeFile(filePath ,req.body.pasteData, (err) => console.log(err));
    // Add url to database
    const newPaste = new Paste({
        url: req.body.url,
        date: req.body.date
    });
    newPaste.save()
        .then(a => res.status(200).json({success: true}))
        .catch(console.log);
});

router.get('/api/download/:url', (req, res) => {
    const fileName = req.params.url + '.txt';
    // Get file path
    const file = path.resolve(__dirname + '/../files/', req.params.url + '.txt');
    fs.exists(file,function(exists){
        if(exists){
            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-Type', 'application/document/txt');
            let rstream = fs.createReadStream(file);
            rstream.pipe(res);
        } else {
            res.json({success: false});
            res.end();
        }
    });
});

module.exports = router;