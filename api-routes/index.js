const router = require('express').Router();

router.route('/').get((req,res)=>{
    res.send('home')
});

module.exports = router;