require('dotenv').config();
const express = require('express');
const app = express()

app.use(express.json());



const WpisyRouter = require('./routes/wpisy');
const KomentarzeRouter = require('./routes/komentarze');
const KategorieRouter = require('./routes/kategorie');

app.use('/routes/wpisy', WpisyRouter);
app.use('/routes/komentarze', KomentarzeRouter);
app.use('/routes/kategorie', KategorieRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({error: err.message || 'Server error'})
});






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port: ${port}`));

