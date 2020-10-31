const router = require('express').Router();
let DocumentInfo = require('../models/document-info');
let AdminProfile = require('../models/admin-profile');
let path = require('path');
const requestIp = require('request-ip');
const resizeOptimizeImages = require('resize-optimize-images');

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

router.route("/get").get((req,res) => {
    res.send();
})

router.route("/:documentId/:fileindex").get((req,res) => {
    const fileIndex = req.params.fileindex;
    const docId = req.params.documentId;
    const authkey = req.body.authkey;
    const password = req.body.password;
    AdminProfile.findOne({ authkey: authkey}, function(err, user) {
        // In case the user not found   
        if(err) {
            res.status(599).json({
                message : "Network Connect Timeout Error",
                success : false,
                err : err
              });
            return;
        }
        if (user && user.password === password){
            DocumentInfo.findOne({ documentId : docId}, function(err, fileInfo) {
                // In case the user not found   
                if(err) {
                    res.status(599).json({
                        message : "Network Connect Timeout Error",
                        success : false,
                        err : err
                      });
                    return;
                }
                if (fileInfo && fileInfo.authkey === authkey){
                    //now give access to data
                    const filesNameArray = fileInfo.filenamearray;
                    if(fileIndex>=filesNameArray.length){
                        res.status(404).json({
                            message : "NOT FOUND",
                            success : false
                          });
                        return;
                    }
                    const reqPath = path.join(__dirname, '../uploads/'+filesNameArray[fileIndex]);
                    res.sendFile(reqPath);
                } else {
                  //authkey or password not found
                  res.status(404).json({
                    message : "NOT FOUND",
                    success : false
                  });
                  return;
                }              
            });    
        } else {
          //authkey or password not found
          res.status(401).json({
            message : "Unauthorized",
            success : false
          });
          return;
        }              
    });
   
    // DocumentInfo.findById(docId)
    //     .select("filename auther")
    //     .exec()
    //     .then(doc => {
    //         if(doc){
    //             res.status(200).json({
    //                 documentinfo : doc,
    //                 url : process.env.WEBSITE_URL+"uploads/"+doc.filename,
    //                 request : {
    //                     type : "GET",
    //                     url : process.env.WEBSITE_URL+"document/"
    //                 }
    //             });
    //         }else{
    //             res
    //             .status(404)
    //             .json({ message: "No valid entry found for provided ID" });
    //         }
    //     })
    //     .catch(err =>{
    //         res.status(500).json({
    //             error : err
    //         });
    //     });
});



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
router.route('/upload').post(upload.array('documentfile', 5),(req,res) => {
    const authkey = req.body.authkey;
    const password = req.body.password
    
    //saving operation to database 
    AdminProfile.findOne({ authkey: authkey}, function(err, user) {
        // In case the user not found   
        if(err) {
            res.status(599).json({
                message : "Network Connect Timeout Error",
                success : false,
                err : err
              });
            return;
        }
        if (user && user.password === password){
            //user is authenticated 
            const documentfiles = req.files;
            const filenamearray = [];
            const appName = req.body.appName
            const documentId = "DOC"+ getRndInteger(100,999) + Date.now(); 
            const auther = req.body.auther;
            const clientIp = requestIp.getClientIp(req);
            const doctype = req.body.doctype;
            
            for (var i = 0; i < documentfiles.length; i++) {  
                
                if(doctype.localeCompare(documentfiles[i].mimetype)){
                    res.status(422).json({
                        message : "Unprocessable Entity",
                        success : false,
                        err : err
                      });
                    return;
                }
                filenamearray.push(documentfiles[i].filename);
                switch(documentfiles[i].mimetype) {
                    case "image/png" || "image/jpeg" || "image/bmp":
                        const imagewidth = Number(req.body.width);
                        const imageheight = Number(req.body.height);
                        const imagequality = Number(req.body.quality);
                      // code block
                      (async () => {
                        // Set the options.
                        const options = {
                            images: [documentfiles[i].path],
                            width: imagewidth,
                            height : imageheight,
                            quality: imagequality
                        };
                            // Run the module.
                            await resizeOptimizeImages(options);
                        })();
        
                      break;
                    case "text/plain":
                        // code block
                      break;
                    case "application/msword" || "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        // code block
                      break;
                    case "application/vnd.ms-powerpoint" || "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                        // code block
                      break;
                    case "application/vnd.ms-excel" || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        // code block
                      break;
                    case "application/zip":
                        // code block
                      break;
                    case "application/pdf":
                        // code to convert pdf to pdfa
                      break;
                    default:
                      // if invalid document uploaded  
                      res.status(422).json({
                        message : "Unprocessable Entity",
                        success : false,
                        err : err
                      });
                      return;
                      
                }

                //   var metadata = {
                //       auther : auther,
                //       apiservice : "docuploadAPI"
                //   } 
                //   ffmetadata.read("../uploads/1604138747485-2-Capture0.PNGY", function(err, data) {
                //     if (err) console.error("Error reading metadata", err);
                //     else console.log(data);
                // });
                //   ffmetadata.write('./uploads/1604138747485-2-Capture0.PNG', metadata, function(err) {
                //     if (err){
                //         console.error("Error writing metadata", err);
                //     } 
                //     else{
                //         console.log("Data written");
                //     } 
                // });
            }
            //auth key and password  are present
            const newDocument = new DocumentInfo({
                documentId,
                auther,
                filenamearray,
                clientIp,
                appName,
                authkey
            });
            newDocument.save()
            .then(() => res.json({
                message : "Success",
                success : true,
                documentId : documentId,
                nooffiles : filenamearray.length
            }))
            .catch(err =>res.status(400).json({
                message : "Bad Request",
                error : err,
                success : false,
                authkey : authkey
            }));

        } else {
            res.status(401).json({
                message : "Unauthorized",
                success : false
              });
          return;
        }              
    });

});

module.exports = router;