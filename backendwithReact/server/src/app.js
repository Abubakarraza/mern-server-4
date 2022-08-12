const express = require("express");
const dotenv = require("dotenv");
const cookieParser=require('cookie-parser');
dotenv.config({ path: './config.env' });
require('./db/conn');
const User = require('../src/model/userSchema');
const app = express();
app.use(cookieParser());
const port = process.env.PORT;
// we link the router file
app.use(require('./router/auth'));
app.use(express.json());
// const middleware = (req, res, next) => {
//     console.log("in middleware");
//     next();
// }
app.get("/", (req, res) => {
    res.send("hello this get");
    console.log("this is get");
});
app.get("/contact", (req, res) => {
    res.cookie("raza","ansari"); 
    res.send("hello this get");
    
    console.log("this is home get");
})
app.listen(port, () => {
    console.log(`server is runing at ${port}`);
});