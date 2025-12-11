require('dotenv').config();
const {MongoClient} = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL);

let db;

async function connectMongoDB() {
  try{
    await client.connect();
    console.log('Polaczono z baza mongo!');

    db = client.db("blogLogs");
    return db;


  }catch (err) {
    console.error("Blad polaczenia: " + err);
  }
}


function getMongoDB(){
  if(!db){
    throw new Error("Baza nie jest jeszce połaczona!");
  }
  return db;
}

module.exports = {connectMongoDB, getMongoDB};