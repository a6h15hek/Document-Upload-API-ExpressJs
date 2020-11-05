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

const documentRouter = require('../api-routes/document');
app.use('/document',documentRouter);

const adminRouter = require('../api-routes/admin');
app.use('/admin',adminRouter);



//404 page if url not found
app.use('*', (req,res)=>{
    res.send("404 Page not Found !");
});


//starting the server on port 5000
app.listen(port, () => {
    console.log(`Server is running on port :${port}`);
});