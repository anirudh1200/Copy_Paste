const express = require('express'),
      router = express.Router(),
      Paste = require('../models/paste'),
      fs = require('fs'),
      path = require('path'),
      PDFDocument = require('pdfkit');

router.get('/api/download', (req, res) => {
    Paste.find()
        .then(allPastes => res.json(allPastes))
        .catch(console.log);
});

router.post('/api/upload', (req, res) => {
    // Create a new .txt file containing the data
    const txtFilePath = path.resolve(__dirname + '/../files/', req.body.url + '.txt');
    fs.writeFile(txtFilePath ,req.body.pasteData, (err) => console.log(err));
    // Create a new .pdf file containing the data
    const pdfFilePath = path.resolve(__dirname + '/../files/', req.body.url + '.pdf');
    const fontPath = path.resolve(__dirname + '/../fonts/OpenSans-Regular.ttf');
    doc = new PDFDocument;    
    doc.pipe(fs.createWriteStream(pdfFilePath));
    doc
        .font(fontPath)
        .fontSize(12)
        .text(req.body.pasteData, 100, 100);
    doc.end();
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
    const file = path.resolve(__dirname + '/../files/', fileName);
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

router.get('/api/downloadpdf/:url', (req, res) => {
    const fileName = req.params.url + '.pdf';
    // Get file path
    const file = path.resolve(__dirname + '/../files/', fileName);
    fs.exists(file,function(exists){
        if(exists){
            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-Type', 'application/document/pdf');
            let rstream = fs.createReadStream(file);
            rstream.pipe(res);
        } else {
            res.json({success: false});
            res.end();
        }
    });
});

module.exports = router;