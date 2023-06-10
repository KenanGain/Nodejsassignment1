const { MongoClient, ObjectId } = require("mongodb");

//MONGODB Setup
//const dbUrl = "mongodb://localhost:27017/testdb";  //if this connection string, use the one below
// const dbUrl = "mongodb://127.0.0.1:27017/testdb";
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl);

//MONGODB HELPER FUNCTIONS
async function connection() {
    db = client.db("testdb");
    return db;
}
async function getAllLinks() {
    db = await connection();
    let results = db.collection("menuLinks").find({});
    resultsArray = await results.toArray();
    return resultsArray;
}
async function addMenuLink(newLink) {
    db = await connection();
    let status = await db.collection("menuLinks").insertOne(newLink);
    console.log("link added");
}
async function deleteMenuLink(id) {
    db = await connection();
    let deleteFilter = { _id: new ObjectId(id) };
    let result = await db.collection("menuLinks").deleteOne(deleteFilter);
    if (result.deletedCount == 1) {
        console.log("delete successful");
    }
}
async function getSelectedLink(linkId) {
    db = await connection();
    let result = db.collection("menuLinks").find({ _id: new ObjectId(linkId) });

    resultsArray = await result.toArray();
    return resultsArray[0];
}
async function updateLink(linkId, updatedLink) {
    db = await connection();
    let updateFilter = { _id: new ObjectId(linkId) };
    let status = await db.collection("menuLinks").updateOne(updateFilter, { $set: updatedLink });
    if (status.modifiedCount === 1) {
        console.log("link updated");
    }
}

module.exports = {
    getAllLinks,
    addMenuLink,
    deleteMenuLink,
    getSelectedLink,
    updateLink
};