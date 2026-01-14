let express = require('express');
let mongoose = require('mongoose');
let cors=require('cors');
const hospitalRouter = require('./routes/hospitalRouter');
require('dotenv').config();

let app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to database");
    app.listen(process.env.PORT,()=>{
        console.log("Server is running");
    });
});

app.use('/api/patient',hospitalRouter);

//http://localhost:3002/api/patient