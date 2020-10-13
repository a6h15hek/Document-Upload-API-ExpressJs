const router = require('express').Router();

//root of post Router
router.route('/').get((req,res)=>{});

// Create Posts
router.post("/create-post",async(req,res) =>{});

// -Get General Posts (Public Oriented)
// -Get Posts (User Oriented)

// -Get Post Uniquely by its unique name
    // GET  https://api.newinque.com/posts/{post-unique-name}

// -Get Trending Posts
// -Get Subscription Posts
// -Get User Saved Posts
// -Get User Liked Posts


// -Get Channel Posts(visible to everyone if public)
  //https://api.newinque.com/{unique-channel-name}

module.exports = router;