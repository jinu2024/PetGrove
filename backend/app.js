const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const user = require("./controller/user")
const cors = require("cors");
const shop = require("./controller/shop");

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: ".env"
    })
}
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
}));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));


//import routes
app.use("/api/v1/user", user);
app.use("/api/v1/shop", shop);

//ErrorHandling
app.use(ErrorHandler);
module.exports = app;