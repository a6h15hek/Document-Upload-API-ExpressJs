const path = require('path');
const express  = require('express');
const cors = require('cors'); //it is middleware to used to create web server
const mongoose = require('mongoose'); // use to create models 

//for dotenv file configuration
require('dotenv').config();

const app = express();
const port =  process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

//connecting database to project
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongo DB connection successfull");
});

app.use('/uploads', express.static('uploads'));
//routing variables 
const indexRouter = require('../api-routes/index');
app.use('/',indexRouter);

app.use('/name', callName); 

const usersRouter = require('../api-routes/users');
app.use('/users',usersRouter);

const documentRouter = require('../api-routes/document');
const nodemon = require('nodemon');
app.use('/document',documentRouter);



//404 page if url not found
app.use('*', (req,res)=>{
    res.send("404 Page not Found !");
});

function callName(req, res) {   
    // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require('child_process').spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    //var process = spawn('python', ["D:/Software/WorkSpace/Project_Hackathon/govtechthon2020/ImageProcess/api-routes/hello.py", "abhishek", "yadav"]  ); 
    var process = spawn('python', ["-u",path.join(__dirname, '../py/hello.py'), "--image", "images/page.jpg"]  ); 

    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) {
        res.send(data.toString()); 
    });
    process.stderr.on('data', function (data){
        console.log(data.toString());
    });
 
} 

//starting the server on port 5000
app.listen(port, () => {
    console.log(`Server is running on port :${port}`);
});