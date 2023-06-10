const express = require("express");
const path = require("path"); // this is included with Node
const dotenv = require("dotenv");
dotenv.config(); //load our custom environment variable

const pageRouter = require("./modules/pages/router");
const menuRouter = require("./modules/menuLinks/router");
const productRouter = require("./modules/productLinks/productrouter");


// const { request } = require("http");


const app = express();  // Creating an express app
const port = process.env.PORT || "8889";

//Set up express app to use as pug template
app.set("views",path.join(__dirname, "views"));
app.set("view engine", "pug");

// All the images are taken from master chef bbq site

app.use(express.static(path.join(__dirname, "public")));


app.use("/", pageRouter);
app.use("/admin/menu", menuRouter);
app.use("/products/product", productRouter);


// Set up Server Listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

