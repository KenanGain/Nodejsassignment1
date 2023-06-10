const { MongoClient } = require("mongodb");

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
async function getAllProductlinks() {
    db = await connection();
    let results = db.collection("productLinks").find({});
    resultsArray = await results.toArray();
    console.log(resultsArray);
    return resultsArray;
    
}

module.exports = {
getAllProductlinks
};