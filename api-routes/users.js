const router = require('express').Router();

//root of users Router
router.route('/').get((req,res)=>{});

// User SignUp Route
router.post("/register",async(req,res) =>{});

// User SignIn Route
router.post("/login",async(req,res) =>{});

// -Email Verification
// -Phone Verification
// -Password Change
// -Email id Change
// -Phone id Change
// -Update User Data

// -Get Public User Profile(Public View)
    //GET https://api.newinque.com/users/{username} 
    //GET GET https://api.linkedin.com/v2/people/(id:{person ID})
    //GET https://api.linkedin.com/v2/people/(id:{profile ID})?projection=(id,firstName,lastName) -- to get few fields



// -Get User Profile(Private View)
router.get("/me",async(req,res)=>{});

// -Deactivate User Account
// -Delete User Account


module.exports = router;