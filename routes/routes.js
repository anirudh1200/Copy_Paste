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

module.exports = router;