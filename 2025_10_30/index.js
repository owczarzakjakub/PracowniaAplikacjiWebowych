const express = require('express')
const fs = require('fs/promises')
const path = require('path')
const mysql = require('mysql2')
const { createConnection } = require('mysql2')

const app = express()

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'firma',
  port: 3306,
})

db.connect(err => {
  if (err) {
    console.error("Connecting to DB failed");
    return;
  }
  console.log('Connected to DB server');
})

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', async (req, res) => {
  try{
    const indexHtml = await fs.readFile('./htmlFiles/index.html', 'utf8')
    res.send(indexHtml);
  }
  catch(err){
    err.status = 404;
    err.message = 'Couldnt find html file';
    res.send("Error occurred" + err.message);
  }
})
app.get('/o-nas' , async (req, res) => {
   try {
     const onas = await fs.readFile('./htmlFiles/o-nas.html', 'utf8')
     res.send(onas);
   }
   catch(err){
      err.status = 404;
      err.message = 'Couldnt find html file';
      res.send("Error occurred: " + err.message);
   }
})

app.get('/oferta' , async (req, res) => {
  try{
    const oferta = await fs.readFile('./htmlFiles/oferta.html', 'utf8')
    res.send(oferta);
  }
  catch(err){
    err.status = 404;
    err.message = 'Couldnt find html file';
    res.send("Error occurred: " + err.message);
  }

})

app.get('/kontakt', async (req, res) => {
  try{
    const kontakt = await fs.readFile('./htmlFiles/kontakt.html', 'utf8')
    res.send(kontakt);
  }
  catch(err){
    err.status = 404;
    err.message = 'Couldnt find html file';
    res.send("Error occurred: " + err.message);
  }
})
app.post('/message' , (req, res) => {
  const method = req.method;
  if (method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      console.log(chunk.toString());
      body.push(chunk);
    })
    req.on('end',   () => {
      const parsedBuffer = Buffer.concat(body);
      const dataString = parsedBuffer.toString('utf8');
      const params = new URLSearchParams(dataString);
      const dataObject = Object.fromEntries(params.entries());
      console.log(dataObject);
      const sql = "insert into messages (Imie, Nazwisko, Email, Message) values (?, ?, ?, ?)";
      const values = [
        dataObject.firstName,
        dataObject.lastName,
        dataObject.emailAdress,
        dataObject.message
      ]
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Saving data to DB was unsuccessful.', err)
        }
        console.log("Wstawiono rekord o id" + result.insertId);
      })
      res.redirect(`/kontakt`);
      return res.end();
    })
  }
})

app.get('/api/contact-messages', (req, res) => {

  const sql = "SELECT * FROM messages";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Reading data from DB was unsuccessful', err)
      return;
    }
    const jsonObjectResult = JSON.stringify(result);
    console.log("Odczytane dane z bazy " + jsonObjectResult);
    res.setHeader('Content-Type', 'application/json');
    res.write(jsonObjectResult);
    return res.end();
  });
})

app.get('/api/contact-messages/:id', (req, res) => {
    const rowID = parseInt(req.params.id);
    const sql = `select * from messages WHERE id=${rowID}`;
    db.query(sql, (err, result) => {
      if (err) {
        err.status = 404;
        console.error(`Reading data dorm DB for id: ${rowID} was unsuccessful`, err)
      }
      else{
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(result));
        return res.end();
      }
    })
})

app.listen(3000, () => {
  console.log('App is running on https://localhost:3000')
})
