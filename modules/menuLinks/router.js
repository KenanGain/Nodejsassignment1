var express = require("express");
var router = express.Router();

const model = require("./func");

//The next two lines tells express to convert form data into Json
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


//ADMIN PAGES FOR MENU LINKS
router.get("/", async (request, response) => {
    let links = await model.getAllLinks();
    response.render("admin/menu-list", { title: "Administer menu links", menu: links });
});
router.get("/add", async (request, response) => {
    let links = await model.getAllLinks();
    response.render("admin/menu-add", { title: "Add menu link", menu: links });
});
router.get("/update", async (request, response) => {
    let links = await model.getAllLinks();
    let selectedLink = await model.getSelectedLink(request.query.linkId);
    console.log(selectedLink);
    response.render("admin/menu-update", { title: "Update menu link", menu: links, selectedMenu: selectedLink });
});
// POST form submission code for the add menu link page
router.post("/add/submit", async (request, response) => {
    //create a json object with the field names from the menuLinks collection and laod the values from the form via request.body.?
 let newLink = {
    name: request.body.name,
    path: request.body.path,
    weight: request.body.weight
 };
 await model.addMenuLink(newLink);
 response.redirect("/admin/menu");
});

//GET from submission code for the delete form
router.get("/delete", async (request, response) => {
    //get the_id
    let id = request.query.linkId;

    //use _id to delete menu link document
    await model.deleteMenuLink(id);
    //resirect to admin listing page
    response.redirect("/admin/menu");
});

//POST For update form
router.post("/update/submit", async (request, response) => {
    let id = request.body.linkId;
    let updatedLink = {
        name: request.body.name,
        path: request.body.path,
        weight: request.body.weight
     };
     await model.updateLink(id, updatedLink);
     response.redirect("/admin/menu");
});

module.exports = router;