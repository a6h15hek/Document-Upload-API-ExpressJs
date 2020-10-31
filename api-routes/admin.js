const router = require('express').Router();
const bcrypt = require('bcryptjs');
let AdminProfile = require('../models/admin-profile');


function getRndAlphaNumeric() {
    return Math.random().toString(36).slice(2);
    //return Math.floor(Math.random() * (max - min) ) + min;
}

router.route('/register').post((req,res) => {
    console.log("registering for admin");
     const name = req.body.name;
     const email = req.body.email;
     const password = req.body.password;
     //const password = bcrypt.hash(req.body.password,12);
     const organization = req.body.organization;
     const authkey = "AUTH"+ getRndAlphaNumeric() + Date.now(); 
    const newAdminProfile = new AdminProfile({
        name,
        email,
        password,
        organization,
        authkey
    });
    newAdminProfile.save()
    .then(() => res.status(200).json({
        message : "Success!",
        success : true,
        authkey : authkey
    }))
    .catch(err => res.status(400).json({
        message : "Bad Request",
        error : err,
        success : false,
        authkey : authkey
    }));
});

module.exports = router;