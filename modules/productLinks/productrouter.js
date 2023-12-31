const express = require("express");
const Router = express.Router();

const Model = require("./productfunction");

Router.use(express.urlencoded({ extended: true }));
Router.use(express.json());

Router.get("/", async (request, response) => {
    let products = await Model.getAllProductlinks();
    console.log(products);
    response.render("products/product-list", { 
        title: "Products List", 
        products: products
    });
});
module.exports = Router;