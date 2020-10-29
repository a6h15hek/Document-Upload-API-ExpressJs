const router = require('express').Router();

//root of users Router
router.route('/').get((req,res)=>{
    res.send("abhishek")
    res.sendFile()
});

module.exports = router;