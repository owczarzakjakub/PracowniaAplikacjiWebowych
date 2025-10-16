const express  = require('express');
const path = require('node:path');
const fs = require('fs/promises');
const mime = require('mime-types');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
        res.send('Strona glowna!');
})

app.get('/jsonFile', (req, res) => {
    const obj = {'json' : 'file'};
    res.send(JSON.stringify(obj));
})

app.get('/nodeHtmlFile', (req, res) => {
    res.send('<h1>Plik html wygenerowany w node </h1>>');
})

app.get('/htmlFile', async (req, res) => {
    const htmlFile = await fs.readFile('index.html', 'utf8');
    res.send(htmlFile);
})

app.get('/get_params', (req, res) => {
    const params = req.query;
    res.send(JSON.stringify(params));
})

app.get('/:filename', async (req, res) => {
    const filename = req.params.filename;
    try{
        await fs.access(`assets/${filename}`);
        let mimeType = mime.lookup(filename);
        let file = await fs.readFile(`assets/${filename}`);
        if(mimeType == 'text/html'){
            file = await fs.readFile(`assets/${filename}`, 'utf-8')
        }
        res.setHeader('Content-Type', mimeType);
        res.send(file);
    }
    catch(err){
        err.message = `Cannot find given file: ${filename}`;
        res.send(err.message);
    }

})

app.listen(port, () => {
    console.log("App is listening at localhost:" + port);
})
