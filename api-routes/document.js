const router = require('express').Router();
let DocumentInfo = require('../models/document-info');
//const processImage = require('../services/image-crop');
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null,"./uploads/");
    },
    filename : function(req, file, cb){
        cb(null, Date.now()+"-"+ Math.floor(Math.random() * 10)+"-"+ file.originalname);
    },
});

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//         cb(null,true);
//     }else{
//         cb(new Error('File type is not as specified.'), false);
//     }
// }

const upload = multer({
    storage : storage
});

router.route('/').get((req,res) => {
    DocumentInfo.find()
        .select("documentId _id filename auther")
        .exec()
        .then(docs => {
            const response = {
                count : docs.length,
                documentinfo : docs.map(doc => {
                    return {
                        documentId : doc.documentId,
                        filename : doc.filename,
                        auther : doc.auther,
                        request : {
                            type : "GET",
                            url : process.env.WEBSITE_URL+"document/" + doc.id
                        } 
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err =>{
            res.status(500).json({
                error : err
            });
        });
});

router.route("/:documentId").get((req,res) => {
    const docId = req.params.documentId;
    DocumentInfo.findById(docId)
        .select("filename auther")
        .exec()
        .then(doc => {
            if(doc){
                res.status(200).json({
                    documentinfo : doc,
                    url : process.env.WEBSITE_URL+"uploads/"+doc.filename,
                    request : {
                        type : "GET",
                        url : process.env.WEBSITE_URL+"document/"
                    }
                });
            }else{
                res
                .status(404)
                .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err =>{
            res.status(500).json({
                error : err
            });
        });
});


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

router.route('/upload').post(upload.single('documentimage'),(req,res) => {
    console.log(req.file);
    const documentId = "DOC"+ getRndInteger(100,999) + Date.now(); 
    const auther = req.body.auther;
    const filename = req.file.filename;
    const newDocument = new DocumentInfo({
        documentId,
        auther,
        filename
    });
    newDocument.save()
    .then(() => res.json({
        message : "Success",
        success : true
    }))
    .catch(err => res.status(400).json({
        message : err
    }));
    //processImage.processImage(filename);
});

module.exports = router;