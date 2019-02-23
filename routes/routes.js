const express = require('express'),
      router = express.Router(),
      Paste = require('../models/paste'),
      fs = require('fs'),
      path = require('path'),
      PDFDocument = require('pdfkit');

router.get('/download', (req, res) => {
    Paste.find()
        .then(allPastes => res.json(allPastes))
        .catch(console.log);
});

router.post('/upload', (req, res) => {
    // Create a new .txt file containing the data
    const txtFilePath = path.resolve(__dirname + '/../files/', req.body.url + '.txt');
    fs.writeFile(txtFilePath ,req.body.pasteData, (err) => console.log(err));
    // Add url to database
    const newPaste = new Paste({
        url: req.body.url,
        date: req.body.date
    });
    newPaste.save()
        .then(a => res.status(200).json({success: true}))
        .catch(console.log);
});

router.get('/:url', (req, res) => {
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

router.get('/pdf/:size/:url', (req, res) => {
    const fileName = req.params.url + '.txt';
    // Get file path
    const file = path.resolve(__dirname + '/../files/', fileName);
    fs.exists(file, (exists) => {
        if(exists){
            handlePfdDownload(res, req.params.url, file, req.params.size);
        } else {
            res.json({success: false});
            res.end();
        }
    });
});

router.get('/pdf/:url', (req, res) => {
    const fileName = req.params.url + '.txt';
    // Get file path
    const file = path.resolve(__dirname + '/../files/', fileName);
    fs.exists(file, (exists) => {
        if(exists){
            handlePfdDownload(res, req.params.url, file, 12);
        } else {
            res.json({success: false});
            res.end();
        }
    });
});

const handlePfdDownload = (res, url, file, size) => {
    const pdfFileName = url + '.pdf';
    const pdfFile = path.resolve(__dirname + '/../files/', pdfFileName);
    generatePdf(file, pdfFile, size);
    fs.exists(pdfFile,function(exists){
        if(exists){
            res.setHeader('Content-disposition', 'attachment; filename=' + pdfFileName);
            res.setHeader('Content-Type', 'application/pdf');
            let rstream = fs.createReadStream(pdfFile);
            rstream.pipe(res);
        } else {
            res.json({success: false});
            res.end();
        }
    });
}

// Create a new .pdf file containing the data
const generatePdf = (file, pdfFile, size ) => {
    let data = fs.readFileSync(file, "utf8");
    const fontPath = path.resolve(__dirname + '/../fonts/OpenSans-Regular.ttf');
    doc = new PDFDocument;    
    doc.pipe(fs.createWriteStream(pdfFile));
    doc
        .font(fontPath)
        .fontSize(size)
        .text(data, 80, 50);
    doc.end();
}

router.get('/delete/:url', (req,res) => {
    const extension = ['.txt', '.pdf'];
    const url = req.params.url;
    let error = 0;
    let notfound = 0;
    for(let i=0; i<2; i++){
        let fileName = url + extension[i];
        let file = path.resolve(__dirname + '/../files/', fileName);
        fs.exists(file, (exists) => {
            if(exists) {
                fs.unlink(file,(err) => {
                    if(err){
                        error = err;
                    }
                });
            } else {
                notfound = 1;
            }
        });
    }
    if(error){
        res.status(200).json({success: false, reason: error});
    } else if(notfound){
        res.status(200).json({success: false, reason: 'file not found'});
    } else {
        Paste.findOne({url})
            .then(foundPaste => foundPaste.remove().catch(console.log))
            .catch(err => console.log);
        res.status(200).json({success: true});
    }
});

module.exports = router;