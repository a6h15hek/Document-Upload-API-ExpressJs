const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port =  process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connecting database to project
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongo DB connection successfull");
});

const indexRouter = require('../api-routes/index');
app.use('/',indexRouter);

const usersRouter = require('../api-routes/users');
app.use('/users',usersRouter);

//starting the server on port 5000
app.listen(port, () => {
    console.log(`Server is running on port :${port}`);
});