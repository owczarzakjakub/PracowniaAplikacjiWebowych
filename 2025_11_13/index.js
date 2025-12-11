require('dotenv').config();
const express = require('express');
const app = express()
const {connectMongoDB, getMongoDB} = require('./db');


app.use(express.json());

connectMongoDB().then(() => {
  const db = getMongoDB();

  app.use(async (req, res, next) => {
    try {
      await db.collection("accessLogs").insertOne({
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        createdAt: new Date(),
      })
    }catch(err) {
      console.error("Wystapil blad podczas logowania zadania" + err);
    }
    next();
  })

  const WpisyRouter = require('./routes/wpisy');
  const KomentarzeRouter = require('./routes/komentarze');
  const KategorieRouter = require('./routes/kategorie');


  app.use('/routes/wpisy', WpisyRouter);
  app.use('/routes/komentarze', KomentarzeRouter);
  app.use('/routes/kategorie', KategorieRouter);


  app.use(async (err, req, res, next) => {
    console.log(err);
    try {
      await db.collection('errorLogs').insertOne({
        status: err.status,
        message: err.message,
        createdAt: new Date()
      })
    }catch(e) {
      console.error("Blad podczas logowania bledu" + e);
    }
    res.status(err.status || 500).json({error: err.message || 'Server error'})
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App listening on port: ${port}`));

}) ;









