const router = require('express').Router();
let DocumentInfo = require('../models/document-info');

router.route('/').get((req,res) => {

});

router.route('/upload').post((req,res) => {
    const docname = req.body.docname;
    const auther = req.body.auther;
   
    const newDocument = new DocumentInfo({
        docname,
        auther
    });
    newDocument.save()
    .then(() => res.json({
        message : "Success",
        success : true
    }))
    .catch(err => res.status(400).json({
        message : err
    }));
});

module.exports = router;