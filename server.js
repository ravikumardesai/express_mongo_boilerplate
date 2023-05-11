const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config()
const bodyParser = require('body-parser');
const connectDb = require('./config/dbConnection');


connectDb()

const app = express()
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("server running on port",port);
})
// within same file logic
// app.get("/api/contacts",(req,res)=>{
//     res.status(200).json({"working":"working"})
// })

// middleware provided by express to access the body data 
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// with saprate file of route -- for contact end point
app.use("/api/contacts",require("./routes/contactRoutes"))

// user routes
app.use("/api/user",require("./routes/userRoutes"))

// for error handling use error handler
app.use(errorHandler)

